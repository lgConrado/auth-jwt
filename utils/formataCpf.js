function formataCpf(cpf) {
    const cpfFormatado = cpf.replace(/[^\d]/g, "");
  
    return cpfFormatado;
  }
  
  module.exports = { formataCpf };