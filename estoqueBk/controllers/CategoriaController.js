const Produto = require('../models/produto');

exports.getAll = (req, res, next) => {
    Produto.findAll({
        order: [
            ['nome', 'ASC']
        ]
    }).then(produtos => {
        res.status(200).json({
            produtos: produtos.map(prod => ({
                id: prod.id,
                nome: prod.nome,
                preco: prod.preco,
                descricao: prod.descricao,
                estoque: prod.estoque
            })),
            mensagem: 'Produtos encontrados.'
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            mensagem: 'Erro no servidor!'
        });
    });
}

exports.getOne = (req, res, next) => {
    const id = req.params.id;
    
    if(id === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Produto.findByPk(id).then(produto => {
            if (produto) {
                res.status(200).json({
                    produto: {
                        id: produto.id,
                        nome: produto.nome,
                        preco: produto.preco,
                        descricao: produto.descricao,
                        estoque: produto.estoque
                    },
                    mensagem: 'Produto encontrado!'
                });
            } else {
                res.status(404).json({
                    mensagem: 'Produto não encontrado!'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}

exports.create = (req, res, next) => {
    const { nome, preco, descricao, estoque } = req.body;

    if(nome === undefined || preco === undefined || estoque === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Produto.create({
            nome: nome,
            preco: preco,
            descricao: descricao,
            estoque: estoque
        }).then(produtoCriado => {
            res.status(201).json({
                mensagem: 'Produto criado com sucesso!',
                produto: {
                    id: produtoCriado.id,
                    nome: produtoCriado.nome,
                    preco: produtoCriado.preco,
                    descricao: produtoCriado.descricao,
                    estoque: produtoCriado.estoque
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}

exports.update = (req, res, next) => {
    const { id, nome, preco, descricao, estoque } = req.body;

    if(id === undefined || nome === undefined || preco === undefined || estoque === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Produto.update({
            nome: nome,
            preco: preco,
            descricao: descricao,
            estoque: estoque
        }, {
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Produto atualizado com sucesso!'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    if(id === undefined) {
        res.status(400).json({
            mensagem: 'Campos inválidos!'
        });
    } else {
        Produto.destroy({
            where: { id: id }
        }).then(() => {
            res.status(200).json({
                mensagem: 'Produto excluído com sucesso!'
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                mensagem: 'Erro no servidor!'
            });
        });
    }
}
