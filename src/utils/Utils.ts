const Utils = {
    formatCurrency: (value: any) => {
        const formatted = value
            .replace(/\D/g, '')
            .replace(/(\d)(\d{2})$/, '$1,$2') 
            .replace(/(?=(\d{3})+(\D))\B/g, '.') 
        return `R$ ${formatted}`;
      },

      formattedValue: (value: number) => {
        return (value * 1).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }
}

export default Utils;