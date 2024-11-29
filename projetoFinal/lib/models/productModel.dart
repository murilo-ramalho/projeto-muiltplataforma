class Produto {
  String id;
  String nome;
  String descricao;
  double preco;
  String imagemUrl;
  String categoria; // Novo campo

  Produto({
    required this.id,
    required this.nome,
    required this.descricao,
    required this.preco,
    required this.imagemUrl,
    required this.categoria,
  });

  Map<String, dynamic> toMap() {
    return {
      'nome': nome,
      'descricao': descricao,
      'preco': preco,
      'imagemUrl': imagemUrl,
      'categoria': categoria, // Novo campo
    };
  }

  static Produto fromMap(Map<String, dynamic> map, String id) {
    return Produto(
      id: id,
      nome: map['nome'] ?? '',
      descricao: map['descricao'] ?? '',
      preco: map['preco']?.toDouble() ?? 0.0,
      imagemUrl: map['imagemUrl'] ?? '',
      categoria: map['categoria'] ?? '', // Novo campo
    );
  }
}
