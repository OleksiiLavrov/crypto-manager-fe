import { Box, Button, IconButton, Modal, TextField, Typography, styled } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ChangeEvent, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export const AddTransaction = () => {
   const [coinName, setCoinName] = useState<string>('');
   const [coinAmount, setCoinAmount] = useState<string>('');
   const [total, setTotal] = useState<string>('');
   const [openModal, setOpenModal] = useState<boolean>(false);

   const submitHandler = async () => {
      try {
         if (coinName.length && coinAmount.length && total.length) {
            await fetch('http://localhost:8080/transactions', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  coin_amount: Number(coinAmount),
                  coin_name: coinName,
                  total_cost: Number(total),
               }),
            }).then((res) => res.json());
            toast.success('Transaction added!');
         }
      } catch (error) {
         console.log(error);
         toast.success(`Something went wrong!\n${error}`);
      }
   };

   const addFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         const formData = new FormData();
         formData.append('file', e.target.files[0]);
         try {
            await fetch('http://localhost:8080/transactions/upload', {
               method: 'POST',
               body: formData,
            }).catch((e) => console.log('error', e));
            setOpenModal(false);
            toast.success('Transactions added!');
         } catch (error) {
            console.log('error', error);
            toast.error(`Something went wrong!\n${error}`);
         }
      }
   };

   const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      textAlign: 'center',
   };

   const VisuallyHiddenInput = styled('input')({
      clip: 'rect(0 0 0 0)',
      clipPath: 'inset(50%)',
      height: 1,
      overflow: 'hidden',
      position: 'absolute',
      bottom: 0,
      left: 0,
      whiteSpace: 'nowrap',
      width: 1,
   });

   return (
      <Box sx={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
         <Toaster position="top-center" reverseOrder={false} />
         <TextField
            label="Coin name"
            variant="outlined"
            value={coinName}
            onChange={(e) => {
               setCoinName(e.target.value);
            }}
         />
         <TextField
            label="Coin amount"
            variant="outlined"
            type="number"
            value={coinAmount}
            onChange={(e) => {
               setCoinAmount(e.target.value);
            }}
         />
         <TextField
            label="Total cost"
            variant="outlined"
            type="number"
            value={total}
            onChange={(e) => {
               setTotal(e.target.value);
            }}
         />
         <Button variant="contained" onClick={submitHandler}>
            Add transaction
         </Button>
         <IconButton color="primary" aria-label="upload-file" onClick={() => setOpenModal(true)}>
            <UploadFileIcon />
         </IconButton>
         <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box sx={style}>
               <Typography mb={1} variant="h6" component="h2">
                  Upload file
               </Typography>
               <Box
                  sx={{
                     display: 'flex',
                     gap: '10px',
                     alignItems: 'center',
                     justifyContent: 'center',
                  }}
               >
                  <Button
                     component="label"
                     role={undefined}
                     variant="contained"
                     startIcon={<UploadFileIcon />}
                  >
                     Upload
                     <VisuallyHiddenInput
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        onChange={addFileHandler}
                     />
                  </Button>
               </Box>
            </Box>
         </Modal>
      </Box>
   );
};
