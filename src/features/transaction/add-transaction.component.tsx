import {
   Box,
   Button,
   FormControl,
   IconButton,
   InputLabel,
   MenuItem,
   Modal,
   Select,
   TextField,
   Typography,
   styled,
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import useStore from '../../store/store';

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

export const AddTransaction = () => {
   const { coins, createTransaction, getCoins } = useStore();
   const [coinName, setCoinName] = useState<string>('');
   const [coinAmount, setCoinAmount] = useState<string>('');
   const [total, setTotal] = useState<string>('');
   const [openModal, setOpenModal] = useState<boolean>(false);
   const [loading, setLoading] = useState<boolean>(false);

   useEffect(() => {
      if (!coins.length) {
         (async () => {
            await getCoins();
         })();
      }
   }, []);

   const coinsName = useMemo(() => {
      return coins.map((coin) => coin.name);
   }, [coins]);

   const submitHandler = async () => {
      setLoading(true);
      try {
         if (coinName.length && coinAmount.length && total.length) {
            await createTransaction({
               coin_amount: Number(coinAmount),
               coin_name: coinName,
               total_cost: Number(total),
            });
            toast.success('Transaction added!');
         }
         setCoinName('');
         setCoinAmount('');
         setTotal('');
      } catch (error) {
         console.log(error);
         toast.error(`Something went wrong!\n${error}`);
      } finally {
         setLoading(false);
      }
   };

   const addFileHandler = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setLoading(true);
         const formData = new FormData();
         formData.append('file', e.target.files[0]);
         try {
            await fetch('http://localhost:8080/transactions/upload', {
               method: 'POST',
               body: formData,
            }).catch((e) => {
               throw new Error(e);
            });
            setOpenModal(false);
            toast.success('Transactions added!');
         } catch (error) {
            console.log('error', error);
            toast.error(`Something went wrong!\n${error}`);
         } finally {
            setLoading(false);
         }
      }
   }, []);

   if (!coins.length) {
      return null;
   }

   return (
      <Box sx={{ display: 'flex', gap: '10px', margin: '10px 0' }}>
         <Toaster position="top-center" reverseOrder={false} />
         <FormControl sx={{ minWidth: '200px' }}>
            <InputLabel id="coin-name-label">Coin name</InputLabel>
            <Select
               labelId="coin-name-label"
               value={coinName}
               label="Coin name"
               onChange={(e) => {
                  setCoinName(e.target.value);
               }}
            >
               {coinsName.length &&
                  coinsName.map((coin) => (
                     <MenuItem key={coin} value={coin}>
                        {coin}
                     </MenuItem>
                  ))}
            </Select>
         </FormControl>
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
         <Button variant="contained" onClick={submitHandler} disabled={loading}>
            Add transaction
         </Button>
         <IconButton color="primary" aria-label="upload-file" onClick={() => setOpenModal(true)}>
            <UploadFileIcon />
         </IconButton>
         <Modal open={openModal} onClose={() => setOpenModal(false)}>
            <Box
               sx={{
                  top: '50%',
                  left: '50%',
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  boxShadow: 24,
                  padding: 4,
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
               }}
            >
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
                  {loading ? (
                     <span>Loading...</span>
                  ) : (
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
                  )}
               </Box>
            </Box>
         </Modal>
      </Box>
   );
};
