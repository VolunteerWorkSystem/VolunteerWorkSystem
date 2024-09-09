import React, { useState, useEffect, useRef } from 'react'
import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'
import FlashOnIcon from '@mui/icons-material/FlashOn'
import FlashOffIcon from '@mui/icons-material/FlashOff'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import { Typography } from '@mui/material'
import { parseError } from '../utils'

const codeReader = new BrowserMultiFormatReader()

const longText = `請用chrome或safari等開啟（點擊右上方的三個點點，選擇以其他應用程式開啟或類似按鈕）`

interface VideoProps {
  style: React.CSSProperties | undefined
  facingMode: string
  onStreamReady: (stream: MediaStream) => void
}

export const Camera: React.FC<VideoProps> = ({
  style,
  facingMode,
  onStreamReady,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const hdConstraints = {
      video: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
        frameRate: { min: 20, ideal: 24, max: 30 },
        facingMode: facingMode ?? 'user',
      },
    }

    const constraints: MediaStreamConstraints = hdConstraints

    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          onStreamReady(stream)
        }
      } catch (error) {
        console.error('Error accessing camera:', error)
      }
    }

    initializeCamera()

    const c = videoRef.current

    // Cleanup function
    return () => {
      if (c) {
        const stream = c.srcObject as MediaStream
        if (stream) {
          const tracks = stream.getTracks()
          tracks.forEach((track) => track.stop())
        }
      }
    }
  }, [facingMode, onStreamReady])

  return <video style={style} ref={videoRef} autoPlay playsInline />
}

function Scanner({
  onDetected,
  onClose,
  facingMode,
  withFlashLight = false,
}) {
  const [error, setError] = useState<unknown>(undefined)

  const handleStreamReady = (stream: MediaStream) => {
    // Do something with the stream, e.g., attach it to another component
    const handleDetected = (result) => {
      codeReader.reset()
      onDetected(result)
    }

    codeReader.decodeFromStream(
      stream,
      undefined as unknown as string,
      (result, error) => {
        if (result) {
          handleDetected(result.getText())
        }
        if (error && !(error instanceof NotFoundException)) {
          setError(error)
        }
      }
    )

    return () => {
      codeReader.reset()
    }
  }

  const [torch, setTorch] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const toggleTorch = () => {
    alert('not maintained')
    // const video = document.querySelector('#video')
    // // get the active track of the stream
    // const track = video.srcObject.getVideoTracks()[0]
    // if (track.getCapabilities().torch) {
    //   track.applyConstraints({
    //     advanced: [{ torch: !torch }],
    //   })
    //   setTorch(!torch)
    // } else {
    //   setError('你的裝置不能用閃光燈')
    //   // alert('你的裝置不能用閃光燈')
    // }
  }

  return (
    <div
      style={{
        background: 'black',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <AppBar
        sx={{ background: 'transparent', color: 'white', boxShadow: 'none' }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={onClose}
            aria-label="close"
            size="large"
          >
            <CloseIcon />
          </IconButton>

          {withFlashLight && (
            <IconButton
              color="inherit"
              onClick={toggleTorch}
              aria-label="flashlight"
              size="large"
            >
              {torch ? <FlashOnIcon /> : <FlashOffIcon />}
            </IconButton>
          )}

          <IconButton color="inherit" aria-label="help" size="large">
            <Tooltip title={longText} open={tooltipOpen}>
              <HelpOutlineIcon onClick={() => setTooltipOpen(!tooltipOpen)} />
            </Tooltip>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Camera
        style={{ width: '100%', objectFit: 'cover' }}
        facingMode={facingMode}
        onStreamReady={handleStreamReady}
      />

      <Typography textAlign="center" color="error">
        {error && parseError(error)}
      </Typography>
    </div>
  )
}

export default Scanner
