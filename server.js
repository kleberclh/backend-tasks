// Importa o módulo 'app' do arquivo 'app.js' localizado na pasta 'src'.
// O 'app' é a instância do aplicativo Express que contém toda a configuração da API.
import app from "./src/app.js";

// Define a porta na qual o servidor irá escutar.
// A porta é obtida a partir das variáveis de ambiente (PORT) ou, se não estiver definida, usa a porta padrão 5000.
const PORT = process.env.PORT || 5100;

// Inicia o servidor na porta definida e imprime uma mensagem no console indicando que o servidor está em execução.
// A função `listen` aceita dois parâmetros: a porta e uma função de callback que é executada quando o servidor está pronto.
// A função de callback é usada aqui para imprimir a mensagem de que o servidor está ouvindo na porta especificada.
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
