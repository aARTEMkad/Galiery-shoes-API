const ShoesModel = require('../model/_shoes')

exports.GetShoes = async (req, res) => {
    ShoesModel.find()
}

exports.AddShoes = async (req, res) => {

    try{
        // const erros = validationResult(req)
        
        // if(!erros.isEmpty()) {
        //     return res.status(400).send({message: erros.array()[0].msg})
        // }

        const shoesVar = new ShoesModel({
            name: req.body.name,
            product: req.body.product,
            price: req.body.price,
            size: req.body.size,
            vendoCode: req.body.vendoCode,
            color: req.body.color,
            //photo: req.body.name,
        })
    
        const doc = await shoesVar.save()
    
        res.send(doc)
    }
    catch(err)
    {
        console.log(err)
        return res.status(404).send({message: err})
    }
}

exports.DeleteShoes = async (req, res) => {
    
}

exports.UpdateShoes = async (req, res) => {
    
}

