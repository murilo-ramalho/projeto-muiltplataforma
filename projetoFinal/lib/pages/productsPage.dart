import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/produto_model.dart';
import 'produto_form_page.dart';

class ProdutosPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Produtos da Lanchonete')),
      body: StreamBuilder(
        stream: FirebaseFirestore.instance.collection('produtos_lanchonete').snapshots(),
        builder: (context, AsyncSnapshot<QuerySnapshot> snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return Center(child: CircularProgressIndicator());
          }
          if (snapshot.hasError) {
            return Center(child: Text('Erro ao carregar os produtos'));
          }

          var produtos = snapshot.data!.docs.map((doc) {
            return Produto.fromMap(doc.data() as Map<String, dynamic>, doc.id);
          }).toList();

          return ListView.builder(
            itemCount: produtos.length,
            itemBuilder: (context, index) {
              var produto = produtos[index];
              return ListTile(
                title: Text(produto.nome),
                subtitle: Text('R\$ ${produto.preco.toStringAsFixed(2)}'),
                trailing: IconButton(
                  icon: Icon(Icons.delete),
                  onPressed: () {
                    FirebaseFirestore.instance
                        .collection('produtos_lanchonete')
                        .doc(produto.id)
                        .delete();
                  },
                ),
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => ProdutoFormPage(produto: produto),
                    ),
                  );
                },
              );
            },
          );
        },
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => ProdutoFormPage()),
          );
        },
        child: Icon(Icons.add),
      ),
    );
  }
}
