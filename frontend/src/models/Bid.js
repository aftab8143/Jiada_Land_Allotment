/**
 * @typedef {Object} BidEvent
 * @property {number} id
 * @property {number} plotId
 * @property {number} floorPrice
 * @property {number} emdAmount
 * @property {string} bidOpenDate
 * @property {string} bidCloseDate
 * @property {string} status - UPCOMING | OPEN | CLOSED | AWARDED
 */

/**
 * @typedef {Object} Bid
 * @property {number} id
 * @property {number} bidEventId
 * @property {number} applicantId
 * @property {number} bidAmount
 * @property {string} emdTransactionId
 * @property {boolean} isWinner
 * @property {string} submittedAt
 */
