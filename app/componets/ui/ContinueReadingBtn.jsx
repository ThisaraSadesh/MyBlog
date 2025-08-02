import React from 'react'

const ContinueReadingBtn = ({redirectUrl}) => {
  return (
<div>
  <span>
    <a
      href={redirectUrl}
      className="inline-block bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition"
    >
      Continue Reading →
    </a>
  </span>
</div>
  )
}

export default ContinueReadingBtn