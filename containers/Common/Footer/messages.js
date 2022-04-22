import { defineMessages } from 'react-intl'

export const scope = 'Footer'
export default defineMessages({
  portfolioFooterTermsOfUse: {
    id: `${scope}.PortfolioFooterTermsOfUse`,
    defaultMessage: 'Terms of Use'
  },
  portfolioFooterPrivacy: {
    id: `${scope}.PortfolioFooterPrivacy`,
    defaultMessage: 'Privacy'
  },
  portfolioFooterNotices: {
    id: `${scope}.PortfolioFooterNotices`,
    defaultMessage: 'Notices'
  },
  portfolioFooterCopyrights: {
    id: `${scope}.PortfolioFooterCopyrights`,
    defaultMessage: '© {copyrightsYear}. For information, contact Project Name Global. See {termsOfUse}, {privacy}, and {notices} for more information.'
  },
  portfolioFooterAboutUs: {
    id: `${scope}.PortfolioFooterAboutUs`,
    defaultMessage: 'Project Name refers to one or more of Project Name Touche Tohmatsu Limited (“DTTL”), its global network of member firms, and their related entities (collectively, the “Project Name organization”). DTTL (also referred to as “Project Name Global”) and each of its member firms and related entities are legally separate and independent entities, which cannot obligate or bind each other in respect of third parties. DTTL and each DTTL member firm and related entity is liable only for its own acts and omissions, and not those of each other. DTTL does not provide services to clients. Please see {link} to learn more.'
  },
  portfolioFooterInfo: {
    id: `${scope}.PortfolioFooterInfo`,
    defaultMessage: 'This communication and any attachment to it is for internal distribution among personnel of Project Name Touche Tohmatsu Limited (“DTTL”), its global network of member firms and their related entities (collectively, the “Project Name organization”). It may contain confidential information and is intended solely for the use of the individual or entity to whom it is addressed. If you are not the intended recipient, please notify us immediately, do not use this communication in any way and then delete it and all copies of it on your system. None of DTTL, its member firms, related entities, employees or agents shall be responsible for any loss or damage whatsoever arising directly or indirectly in connection with any person relying on this communication.'
  }
})