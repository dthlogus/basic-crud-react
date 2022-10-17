import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Pessoa } from "../model/Pessoa";

export function FormPessoa() {
  const [pessoa, setPessoa] = useState<Pessoa>({
    id: Math.floor(Math.random() * 10000000) + 2,
    nome: "",
    email: "",
    telefone: "",
    status: "false",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setPessoa({
      ...pessoa,
      [event.target.name]: value,
    });
  }

  function enviar() {
    axios
      .post("http://localhost:3000/pessoa", pessoa)
      .then(() => {
        setPessoa({
          id: Math.floor(Math.random() * 10000000) + 2,
          nome: "",
          email: "",
          telefone: "",
          status: "false",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
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
      <button onClick={() => enviar()}>Enviar</button>
    </>
  );
}
