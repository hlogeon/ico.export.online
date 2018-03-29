# Export.online ICO Contracts

Baked with <3 by [secret_tech](https://secrettech.io)

## EXON token functionality
In order to further the development of the platform, reach breakeven and get to the global market as soon as possible we are going to raise extra funding by running an ICO campaign.

Export.online issued 36,547,525 EXON tokens total, 84,3% of which will be put on sale. The base cost of tokens will depend on the popularity of the platform, and their holders will be able to share the success of Export.online by getting dividends from the platform.

EXON token can also be used to get an access to the export.online platform features.

To sum up, EXON tokens will serve as a local digital currency, which can be used for paying Export.online fees and mutual corporate payments, just like any other popular cryptocurrency.

EXON token is developed on Ethereum’s blockchain and conform to the ERC20 Token Standard.

### Important notes:

1. EXON tokens will be sent automatically back to the wallet from which the funds have been sent
2. EXON tokens transactions will be limited till ICO end to prevent trading before the ICO ends
3. All the token purchases should be done using the official Export.online ICO dashboard in order to enable KYC/AML
4. We'll send back all ETH in case of minimal cap is not collected

## How to setup development environment and run tests?

1. Install `docker` if you don't have it
1. Clone this repo
1. Run `docker-compose build --no-cache`
1. Run `docker-compose up -d`
You should wait a bit until Oraclize ethereum-bridge initialize. Wait for
`Please add this line to your contract constructor:
OAR = OraclizeAddrResolverI(0x6f485C8BF6fc43eA212E93BBF8ce046C7f1cb475);`
message to appear. To check for it run `docker logs ico_oracle_1`
1. Install dependencies: `docker-compose exec workspace yarn`
1. To run tests: `docker-compose exec workspace truffle test`
1. To merge your contracts via sol-merger run: `docker-compose exec workspace yarn merge`
Merged contracts will appear in `merge` directory
