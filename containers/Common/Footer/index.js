import React from 'react'
import { useIntl } from 'react-intl'
import { globalFiles, baseUrl, aboutUsLink } from 'src/config'
import { portfolioFooter } from './constants'
import './styles.scss'

const Footer = (props) => {

  const intl = useIntl()
  const pathName = window.location.pathname.replace(/\//g, '')
  const isPortfolioView = pathName === 'portfolio'

  const links = {
    termsOfUse: (<a href={baseUrl + '/' + globalFiles.termsOfUse} target='_blank'>{intl.formatMessage(portfolioFooter.portfolioFooterTermsOfUse)}</a>),
    privacy: (<a href={baseUrl + '/' + globalFiles.privacy} target='_blank'>{intl.formatMessage(portfolioFooter.portfolioFooterPrivacy)}</a>),
    notices: (<a href={baseUrl + '/' + globalFiles.notices} target='_blank'>{intl.formatMessage(portfolioFooter.portfolioFooterNotices)}</a>),
    about: (<a href={aboutUsLink.href} target='_blank'>{aboutUsLink.title}</a>)
  }

  const renderPortfolioFooter = () => {
    return (
      <div className='portfolio'>
        <div className='portfolio__container'>
          <div className='copyrights-content' >
            {
              intl.formatMessage(
                portfolioFooter.portfolioFooterCopyrights,
                {
                  copyrightsYear: new Date().getFullYear(),
                  termsOfUse: links.termsOfUse,
                  privacy: links.privacy,
                  notices: links.notices
                }
              )
            }
          </div>
          <div className='aboutus-content'>{intl.formatMessage(portfolioFooter.portfolioFooterAboutUs, {link: links.about})}</div>
          <div className='info-content'>{intl.formatMessage(portfolioFooter.portfolioFooterInfo)}</div>
        </div>
      </div>
    )
  }

  return (
    <div className='footer-bf'>
      {isPortfolioView && renderPortfolioFooter()}
    </div>
  )
}

export default Footer