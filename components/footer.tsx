'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons"
import { faTwitter, faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <div className="bg-amber-600 text-xl text-white p-4 flex flex-col items-center space-y-4">
      <h1>Contacts</h1>
      <div className="flex space-x-6">
        <a href="mailto:muenidoris22@gmail.com" className="hover:underline flex items-center space-x-2">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>muenidoris22@gmail.com</span>
        </a>
        <a href="tel:+254700000000" className="hover:underline flex items-center space-x-2">
          <FontAwesomeIcon icon={faPhone} />
          <span>+254 706 451 121</span>
        </a>
      </div>
      <div className="flex space-x-6">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://www.instagram.com/baby_.doris?igsh=MWJ5cmt3amMzemQ0bA==" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
      </div>
    </div>
  )
}
