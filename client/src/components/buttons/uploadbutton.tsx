import { useState } from 'react';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import { UploadLoader } from '../loader/uploadLoader';
import { storeDispatchType } from '../../store/store';
import { modalActions } from '../../store/modal';
import { useDispatch } from 'react-redux';

export const Uploadbutton = ({ fn }: { fn: () => Promise<string> }) => {

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch: storeDispatchType = useDispatch();
  const handleUpload = async () => {
    setLoading(true);

    try {
      const msg = await fn();
      toast.success(msg);
      dispatch(modalActions.closeModal())
    } catch (err) {
      toast.error(err as string);
    } finally {
      setLoading(false);
    }
  }

  console.log(loading)


  return (<>
    {loading && <><UploadLoader /> <p>uploading...</p></>}
    {!loading && <StyledWrapper>
      <div>
        <button disabled={loading} onClick={handleUpload} className="container-btn-file">
          Upload
        </button>
      </div>
    </StyledWrapper>}
  </>
  );
}

const StyledWrapper = styled.div`
  .container-btn-file {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    background-color: #529af2 ;
    color: #fff;
    border-style: none;
    padding: 0.7em 2em;
    border-radius: 0.5em;
    overflow: hidden;
    z-index: 1;
    box-shadow: 4px 8px 10px -3px rgba(0, 0, 0, 0.356);
    transition: all 250ms;
  }
  .container-btn-file input[type="file"] {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
  .container-btn-file > svg {
    margin-right: 1em;
  }
  .container-btn-file::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 0;
    border-radius: 0.5em;
    background-color: #2e71c2;;
    z-index: -1;
    transition: all 350ms;
  }
  .container-btn-file:hover::before {
    width: 100%;
  }`;


