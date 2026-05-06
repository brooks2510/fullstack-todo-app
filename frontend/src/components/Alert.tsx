import { AlertCircle, CheckCircle } from 'lucide-react';

interface AlertProps {
  type: 'error' | 'success';
  message: string;
}

const Alert = ({ type, message }: AlertProps) => {
  const isError = type === 'error';
  
  return (
    <div className={`flex items-center gap-2 p-3 rounded-lg text-sm mb-4 ${
      isError 
        ? 'bg-red-50 text-red-700 border border-red-200' 
        : 'bg-green-50 text-green-700 border border-green-200'
    }`}>
      {isError ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
      <span>{message}</span>
    </div>
  );
};

export default Alert;
