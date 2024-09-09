import React, { useEffect, useState } from 'react'

import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library'

const codeReader = new BrowserMultiFormatReader()

function SmallScanner({ onDetected, onClose, facingMode = 'environment' }) {
  const [scanned, setScanned] = useState(false)

  const handleDetected = (result) => {
    if (scanned === false) {
      setScanned(true)
      codeReader.reset()
      onDetected(result)
    }
  }

  useEffect(() => {
    const hdConstraints = {
      video: {
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
        frameRate: { min: 20, ideal: 24, max: 30 },
        facingMode: facingMode ?? 'user',
      },
    }

    codeReader.decodeFromConstraints(
      hdConstraints,
      'video',
      (result, error) => {
        if (result) {
          handleDetected(result.getText())
        }
        if (error && !(error instanceof NotFoundException)) {
          throw error
        }
      }
    )

    return () => {
      codeReader.reset()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ background: 'black' }}>
      <div>
        <video id="video" style={{ width: '100%' }}></video>
      </div>
    </div>
  )
}

export default SmallScanner
