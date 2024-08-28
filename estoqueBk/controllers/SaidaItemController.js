const express = require('express');
const SaidaItem = require('../models/saidaitem');
const Saida = require('../models/saida');
const Produto = require('../models/produto');

exports.getAll = (req, res, next) => {
    const id = req.params.id;
    
    SaidaItem.findAll({
        include: [Saida, Produto],
        where: { saidaId: id }
    }).then(saidas => {
        res.status(200).json({
            saidaItems: saidas,
            mensagem: 'Itens de saída encontrados com sucesso.'
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            mensagem: 'Erro ao buscar itens de saída.'
        });
    });
}

exports.renderNovo = (req, res, next) => {
    Produto.findAll({
        order: [['descricao', 'ASC']]
    }).then(produtos => {
        res.status(200).json({
            produtos: produtos,
            mensagem: 'Produtos disponíveis para seleção.'
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            mensagem: 'Erro ao buscar produtos.'
        });
    });
}

exports.create = (req, res, next) => {
    const { saidaId, qtde, produtoId } = req.body;

    SaidaItem.create({
        saidaId: saidaId,
        qtde: qtde,
        produtoId: produtoId
    }).then(() => {
        res.status(201).json({
            mensagem: 'Item de saída criado com sucesso.'
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            mensagem: 'Erro ao criar item de saída.'
        });
    });
}

exports.renderEditar = (req, res, next) => {
    const id = req.params.id;

    SaidaItem.findByPk(id, {
        include: [Produto]
    }).then(saidaItem => {
        if (!saidaItem) {
            return res.status(404).json({
                mensagem: 'Item de saída não encontrado.'
            });
        }

        Produto.findAll({
            order: [['descricao', 'ASC']]
        }).then(produtos => {
            res.status(200).json({
                saidaItem: saidaItem,
                produtos: produtos,
                mensagem: 'Detalhes do item de saída e lista de produtos disponíveis.'
            });
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                mensagem: 'Erro ao buscar produtos.'
            });
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            mensagem: 'Erro ao buscar item de saída.'
        });
    });
}

exports.update = (req, res, next) => {
    const { id, qtde } = req.body;

    SaidaItem.update({
        qtde: qtde
    }, {
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            mensagem: 'Item de saída atualizado com sucesso.'
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            mensagem: 'Erro ao atualizar item de saída.'
        });
    });
}

exports.delete = (req, res, next) => {
    const id = req.params.id;

    SaidaItem.destroy({
        where: { id: id }
    }).then(() => {
        res.status(200).json({
            mensagem: 'Item de saída excluído com sucesso.'
        });
    }).catch(err => {
        console.error(err);
        res.status(500).json({
            mensagem: 'Erro ao excluir item de saída.'
        });
    });
}
