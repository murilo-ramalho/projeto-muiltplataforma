import 'package:flutter/material.dart';
import '../models/produto_model.dart';

class ProdutoDetalhesPage extends StatelessWidget {
  final Produto produto;

  ProdutoDetalhesPage({required this.produto});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(produto.nome)),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (produto.imagemUrl.isNotEmpty)
              Center(
                child: Image.network(
                  produto.imagemUrl,
                  height: 200,
                  fit: BoxFit.cover,
                ),
              ),
            SizedBox(height: 16),
            Text(
              produto.nome,
              style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8),
            Text(
              produto.descricao,
              style: TextStyle(fontSize: 16),
            ),
            SizedBox(height: 16),
            Text(
              'Preço: R\$ ${produto.preco.toStringAsFixed(2)}',
              style: TextStyle(fontSize: 20, color: Colors.green),
            ),
          ],
        ),
      ),
    );
  }
}
