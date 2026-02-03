📝 Guia de Uso: Checklist de Rotina

Este sistema foi desenvolvido para ser uma ferramenta leve e persistente para a gestão das tuas tarefas diárias e semanais.

🚀 Como Começar

O sistema funciona em dois estados principais: Modo de Visualização e Modo de Edição.

🛠️ Modo de Edição (Ícone de Lápis/Gravar)

Usa este modo para configurar a tua estrutura. As alterações são guardadas automaticamente no localStorage.

Criar Categoria: No fundo da página, introduz o nome (ex: "Manhã", "Sexta-Feira") e clica em Criar Categoria.

Adicionar Tarefas: Dentro de uma categoria expandida, usa o campo "Nova tarefa..." e clica no botão +.

Eliminar Tarefas: Clica no ícone X vermelho ao lado da tarefa.

Eliminar Categorias: Clica no ícone do Lixo no cabeçalho da categoria.

📋 Modo de Visualização (Uso Diário)

Usa este modo para marcar as tarefas enquanto as realizas.

Marcar/Desmarcar: Clica em qualquer lugar da linha da tarefa.

Expandir/Colapsar: Clica no título da categoria para ver ou esconder as tarefas.

Identificação de Hoje: O sistema identifica automaticamente o dia da semana no título da categoria (baseado no nome que deste à categoria) e destaca-a.

🔄 Resiliência e Dados

Persistência: Os dados não se perdem ao fechar o browser. Estão guardados no localStorage sob as chaves l_checks (estados) e l_struct (estrutura).

Reset Total: O botão "Resetar Tudo" desmarca todos os itens, mas mantém a estrutura de categorias e tarefas intacta para o dia seguinte.

💡 Dicas de Programador (Stack)

Extensão: .tsx (TypeScript React).

Estilização: Tailwind CSS.

Ícones: Lucide-react.

Renderização: Condicional, para evitar conflitos de eventos entre o clique da linha e o botão de delete.
