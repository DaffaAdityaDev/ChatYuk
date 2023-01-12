import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
  } from '@chakra-ui/react'
import React, { useEffect } from 'react'


function LoadingModal({isRedirect}) {
    const OverlayOne = () => (
        <ModalOverlay
        //   bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = React.useState(<OverlayOne />)

    useEffect(() => {
        if(isRedirect) {
            onOpen()
        }
    }, [isRedirect])
    
    
    return (
    <>
        {/* <Button
        onClick={() => {
            onOpen()
        }}
        >
        Use Overlay one
        </Button> */}
        <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
            <ModalHeader>Mengalihkan Halaman</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Text>Akun anda terdaftar</Text>
            </ModalBody>
            <ModalFooter>
            </ModalFooter>
        </ModalContent>
        </Modal>
    </>
    )
}

export default LoadingModal