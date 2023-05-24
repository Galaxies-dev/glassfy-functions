import express, { Request, Response, NextFunction, RequestHandler } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT;
app.use(express.json());

let events: any[] = [
  {
    sort_date_ms: 1684913378000,
    id: 'de2c6babd18d4b6abf37f68c992f8550',
    event_date: 1684913385,
    source: 'SDK',
    type: 5008,
    environment: 'S',
    store: '1',
    vendorid: 'da30d3e022c74d3a92aef37dcae3f592',
    appid: '867a4e3d37cc40ae9d58a6c5e30360e9',
    subscriberid: '4cfc976b3e0d46ec8c4989169ba60148',
    original_transaction_id: '2000000336895530',
    transaction_id: '2000000336895530',
    productid: 'ios_gems_100_consumable_1.99',
    date_ms: 1684913378000,
    original_purchase_date_ms: 1684913378000,
    price: 1.99,
    price_usd: 2.144142396914159,
    currency_code: 'EUR',
    country_code: 'DE',
    quantity: 1,
    web_order_line_item_id: '',
    days: 8178,
    weeks: 1168,
    months: 268,
    auto_renew_product_id: '',
    auto_renew_status: false,
    grace_period_expires_date_ms: 0,
    is_in_billing_retry_period: false,
    price_consent_status: '',
    offer_code_ref_name: '',
    offeringid: '',
    expiration_intent: '',
    userunknown: false,
    sub_platform: '1',
    system_version: '16.4.1',
    device: 'iPhone13,3',
    sdk_version: '1.3.5',
    bundle_version: '1',
    app_version: '1.0.0',
    estimated: 0,
    adjustid: '',
    appsflyerid: '',
    ip: '',
    idfa: '',
    idfv: '',
    gaid: '',
    asid: '',
    aid: '',
    licensecode: '',
    packagename: 'com.devdactic.glassfy',
    user_url: 'https://dashboard.glassfy.io/da30d3e022c74d3a92aef37dcae3f592/Simons_App/customers/details?s=4cfc976b3e0d46ec8c4989169ba60148',
  },
];

const isAuthorized: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'mysecretevalue') {
    next();
  } else {
    res.status(401);
    res.json({ msg: 'No access' });
  }
};

// CREATE
app.post('/webhook', (req, res) => {
  console.log('Received webhook: ', req.body);
  const newEv = {
    ...req.body,
    user_url: `https://dashboard.glassfy.io/${req.body.vendorid}/Simons_App/customers/details?s=${req.body.subscriberid}`,
  };

  events.push(newEv);
  res.json({ success: true });
});

// READ
app.get('/events', isAuthorized, (_, res) => {
  res.json(events);
});

// GET one event
app.get('/events/:id', isAuthorized, (req, res) => {
  const id = req.params.id;

  const ev = events.filter((event) => event.id === id)[0];
  res.json(ev);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
