import toast from 'react-hot-toast';

export const handleSuccess = (msg) => {
  toast.success(msg, {
    style: {
      background: '#dcfce7', 
      color: '#4caf50',     
    },
  });
};
