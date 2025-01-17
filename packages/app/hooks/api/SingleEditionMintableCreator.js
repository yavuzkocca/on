export default contractABI = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_implementation',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'uint256',
        name: 'editionId',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'editionSize',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'editionContractAddress',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'creatorName',
        type: 'string'
      }
    ],
    name: 'CreatedEdition',
    type: 'event'
  },
  {
    inputs: [
      { internalType: 'string', name: '_name', type: 'string' },
      { internalType: 'string', name: '_symbol', type: 'string' },
      {
        internalType: 'string',
        name: '_description',
        type: 'string'
      },
      {
        internalType: 'string',
        name: '_animationUrl',
        type: 'string'
      },
      {
        internalType: 'bytes32',
        name: '_animationHash',
        type: 'bytes32'
      },
      { internalType: 'string', name: '_imageUrl', type: 'string' },
      {
        internalType: 'bytes32',
        name: '_imageHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '_editionSize',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_royaltyBPS',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_mintPeriodSeconds',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: '_salePrice',
        type: 'uint256'
      },
      { internalType: 'string', name: '_creatorName', type: 'string' }
    ],
    name: 'createEdition',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'editionId', type: 'uint256' }
    ],
    name: 'getEditionAtId',
    outputs: [
      {
        internalType: 'contract SingleEditionMintable',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'implementation',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function'
  }
]
