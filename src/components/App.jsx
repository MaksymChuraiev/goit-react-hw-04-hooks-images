import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getApi } from 'services/api';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Main } from './App.styled';
import { ErrorMessage } from './ErrorMessage/ErrorMessage';
import { Modal } from './Modal/Modal';
import * as Scroll from 'react-scroll';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  LOADER: 'loader',
  REJECTED: 'rejected',
};

export const App = () => {
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [modalImage, setModalImage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);

  useEffect(() => {
    if (!search) {
      return;
    }

    const loadImages = () => {
      setStatus(Status.PENDING);
      getApi(search, page)
        .then(res => {
          setImages(prevImages => [...prevImages, ...res]);
          setStatus(Status.RESOLVED);
        })
        .catch(error => {
          setError(error);
          setStatus(Status.REJECTED);
        });
    };

    if (page === 1) {
      setImages([]);
      loadImages();
    } else {
      loadImages();
    }
  }, [page, search]);

  const loadMore = () => {
    Scroll.animateScroll.scrollMore(500);
    setPage(prevPage => prevPage + 1);
  };

  const onSearchName = name => {
    setSearch(name);
    setPage(1);
  };

  const togleModal = () => {
    setShowModal(prevShow => !prevShow);
  };

  const onModalImage = image => {
    setModalImage(image);
  };

  return (
    <Main>
      <Searchbar onSubmit={onSearchName} />
      {images.length > 0 && (
        <ImageGallery
          images={images}
          modalImage={onModalImage}
          togleModal={togleModal}
        />
      )}
      {status === Status.PENDING && <Loader />}
      {status === Status.RESOLVED && <Button onClick={loadMore} />}
      {status === Status.REJECTED && <ErrorMessage message={error.message} />}
      {showModal && <Modal onClose={togleModal} modalImage={modalImage} />}
    </Main>
  );
};
