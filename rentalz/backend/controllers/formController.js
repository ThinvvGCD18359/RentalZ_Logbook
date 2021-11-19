const prisma = require('../prisma/index');

class FormController {
    getAllForm = async (req, res, next) => {
        try {
            const getForm = await prisma.form.findMany();
            res.status(200).json(getForm);
        } catch (error) {
            return next(error);
        }
    };

    createNewForm = async (req, res, next) => {
        try {
            const isExist = await prisma.form.findUnique({
                where: { address: req.body.address }
            });
            if (isExist) return res.json({ message: "Address already exists" })

            const createForm = await prisma.form.create({
                data: {
                    address: req.body.address,
                    propertyType: req.body.propertyType,
                    bedroom: req.body.bedroom,
                    myDate: new Date(req.body.myDate),
                    price: parseInt(req.body.price),
                    furniture: req.body.furniture,
                    note: req.body.note,
                    reporter: req.body.reporter,
                },
            });
            res.status(200).json(createForm);
        } catch (error) {
            console.log(error);
            return next(error);
        }
    };

    deleteRentForm = async (req, res, next) => {
        try {
            const deleteForm = await prisma.form.delete({
                where: { id: req.body.formId },
            });
            return res.status(200).json(deleteForm);
        } catch (error) {
            return next(error);
        }
    };

    getAllNote = async (req, res, next) => {
        try {
            const getNote = await prisma.note.findFirst({
                where: {formId: Number(req.query.formId)},
            });
            return res.status(200).json(getNote);
        } catch (error) {
            return next(error);
        }
    };

    editNote = async (req, res, next) => {
        try {
            const updateNote = await prisma.note.upsert({
                create: {
                    typeNote: req.body.typeNote,
                    roomNote: req.body.roomNote,
                    dateNote: req.body.dateNote,
                    priceNote: req.body.priceNote,
                    furnitureNote: req.body.furnitureNote,
                },
                update: {
                    typeNote: req.body.typeNote,
                    roomNote: req.body.roomNote,
                    dateNote: req.body.dateNote,
                    priceNote: req.body.priceNote,
                    furnitureNote: req.body.furnitureNote,
                },
                where: { id: req.body.id }
            });
            return res.status(200).json(updateNote);
        } catch (error) {
            return next(error)
        }
    };

    search = async (req, res, next) => {
        try {
            const searchResult = await prisma.form.findMany({
                where: {
                    address: {
                        contains: req.query.keyword,
                        mode: "insensitive",
                    },
                },
            });
            return res.status(200).json(searchResult);
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new FormController();