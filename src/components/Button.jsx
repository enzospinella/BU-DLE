import React from 'react';

const Button = ({
  children,
  onClick,
  corFundo = 'bg-yellow-400', // Cor vibrante padrão
  corTexto = 'text-black',
  icone = null,
  ...props
}) => {
  // O segredo desse botão está no shadow sólido e no active (quando clica)
  const baseStyles = `
    group relative inline-flex items-center justify-center 
    px-10 py-5 /* Tamanho considerável (grande) */
    text-2xl font-black uppercase tracking-widest /* Fonte forte e chamativa */
    border-4 border-black rounded-xl /* Borda grossa estilo patch de atlética */
    transition-all duration-100 ease-in-out
    focus:outline-none
  `;

  // Efeito 3D brutalista: Sombra sólida preta que some quando o botão é pressionado (afunda)
  const shadowStyles = `
    shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
    hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5
    active:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-y-[6px] active:translate-x-[6px]
  `;

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${shadowStyles} ${corFundo} ${corTexto}`}
      {...props}
    >
      {/* Container interno para alinhas ícone e texto */}
      <span className="flex items-center gap-3">
        {icone && (
          <span className="text-3xl transition-transform duration-200 group-hover:scale-110 group-hover:rotate-12">
            {icone}
          </span>
        )}
        {children}
      </span>
    </button>
  );
};

export default Button;