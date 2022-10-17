import { FormPessoa } from "./components/FormPessoa";
import { TablePessoa } from "./components/TablePessoa";

function App() {
  return (
    <>
      <FormPessoa />
      <TablePessoa />
    </>
  );
}

export default App;

/* 
  Formulario de cadastro que precisa:
  Nome - texto
  Email - email
  telefone - Se possível com mascara brasileira.
  Ativo ou não - radio

  usando json-server
*/
