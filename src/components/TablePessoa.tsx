import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { Pessoa } from "../model/Pessoa";
import { telefoneMask } from "../uteis/Uteis";

export function TablePessoa() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [pessoa, setPessoa] = useState<Pessoa>({
    id: 0,
    nome: "",
    email: "",
    telefone: "",
    status: "false",
  });
  const [editar, setEditar] = useState<boolean>(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPessoa({
      ...pessoa,
      [event.target.name]: value,
    });
  }

  useEffect(() => {
    axios
      .get<Pessoa[]>(`http://localhost:3000/pessoa`)
      .then((response) => {
        setPessoas(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  function editarTable(id: number) {
    axios
      .get<Pessoa>(`http://localhost:3000/pessoa/${id}`)
      .then((response) => {
        setPessoa(response.data);
      })
      .catch((err) => console.log(err));
    setEditar(!editar);
  }

  function editarApi(id: number) {
    axios
      .put(`http://localhost:3000/pessoa/${id}`, pessoa)
      .then(() => {
        setPessoa({
          id: 0,
          nome: "",
          email: "",
          telefone: "",
          status: "false",
        });
      })
      .catch((err) => console.log(err));
    setEditar(!editar);
  }

  function excluir(id: number) {
    axios
      .delete(`http://localhost:3000/pessoa/${id}`)
      .then(() => console.log("excluido com sucesso"))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>nome</th>
            <th>email</th>
            <th>telefone</th>
            <th>status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {pessoas.map((data) => (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.nome}</td>
              <td>{data.email}</td>
              <td>{telefoneMask(data.telefone)}</td>
              <td>{data.status}</td>
              <td>
                <button onClick={() => editarTable(data.id)}>Editar</button>
                <button onClick={() => excluir(data.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editar ? (
        <>
          <form>
            <input
              type="text"
              name="nome"
              id="nome"
              placeholder="digite seu nome"
              value={pessoa.nome}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              id="email"
              value={pessoa.email}
              onChange={handleChange}
              placeholder="digite seu email"
            />
            <input
              type="text"
              name="telefone"
              id="telefone"
              value={pessoa.telefone}
              onChange={handleChange}
              placeholder="(99) 99999-9999"
            />
            <input
              type="radio"
              id="pessoa-ativa-true"
              name="status"
              value="true"
              checked={pessoa.status === "true"}
              onChange={handleChange}
            />
            <label htmlFor="pessoa-ativa-true">Ativo</label>
            <input
              type="radio"
              id="pessoa-ativa-false"
              name="status"
              value="false"
              checked={pessoa.status === "false"}
              onChange={handleChange}
            />
            <label htmlFor="pessoa-ativa-false">Desativado</label>
          </form>
          <button onClick={() => editarApi(pessoa.id)}>Editar</button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
