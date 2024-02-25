const Todo = require("../schema/TodoSchema");

const addCurd = async (req, res) => {

    try {
        const user = new Todo(req.body);
        await user.save();
        res.status(201).send({
            status: true,
            message: "Task added SuccesFully"
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: error.message
        })
    }
}

const getAllCrud = async (req, res) => {
    try {
        const data = await Todo.find();
        res.status(201).send({
            status: true,
            message: "Task Fatched SuccesFully",
            data
        });
    } catch (error) {
        res.status(400).send({
            status: false,
            message: error.message
        })
    }
}

const editCrud = async (req, res) => {
    const { id } = req.query

    try {
        await Todo.findOneAndUpdate({ _id: id }, req.body);

        res.status(200).send({
            status: true,
            message: "Crud Update SuccessFull"
        })
    } catch (error) {
        res.status(400).send({
            status: false,
            message: error.message
        })
    }
}

const deleteCrud = async (req,res) =>{
    const { id } = req.query
        try {
            if(req.userType !== 'Admin') {
                return res.status(400).send({
                    status: false,
                    message: "You Have No Permission To delete the task please Contexct to the admin"
                });
            }
            await Todo.findByIdAndDelete({_id: id});
            res.status(200).send({
                status: true,
                message: "Crud deleted SuccessFull"
            })
        } catch (error) {
            res.status(400).send({
                status: false,
                message: error.message
            })
        }
}


module.exports = { addCurd, getAllCrud, editCrud ,deleteCrud }