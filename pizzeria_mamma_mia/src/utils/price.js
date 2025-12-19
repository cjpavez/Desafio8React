export function formatCurrency(value) {
  const num = Number(value) || 0;
  return `$${num.toLocaleString('es-CL')}`;
}

export default formatCurrency;
