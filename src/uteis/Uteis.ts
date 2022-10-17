export const telefoneMask = (value: string) => {
  if (!value) return null;
  return value
    .replace(/\D/g, "") // substitui qualquer caracter que nao seja numero por nada
    .replace(/^(\d{2})(\d)/g, "($1) $2") // captura 2 grupos de numero o primeiro de 2 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um parenteses antes do segundo grupo de numero e antes do primeiro grupo
    .replace(/(\d)(\d{4})$/, "$1-$2");
};
