// Importez les modules nécessaires de React et TypeScript
import React, { FC, ReactNode, ButtonHTMLAttributes } from 'react';

// Interface pour définir les propriétés du composant Button
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  // Ajoutez d'autres propriétés personnalisées si nécessaire
}

// Composant fonctionnel Button
const Button: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button {...props}>
      {children}
    </button>
  );
};

export default Button;
