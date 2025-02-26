import React from 'react';

interface OptionButtonProps {
  icon: React.ReactNode;
  text: string;
}

export default function OptionButton({ icon, text }: OptionButtonProps) {
  return (
    <button
      className='flex gap-3 border-2 border-orange-500 text-orange-400 rounded-lg pl-5 pr-8.5 pt-1.5 pb-2 justify-start'
    >
      {icon}
      <span className='font-bold pt-0.5'>{text}</span>
    </button>
  );
};