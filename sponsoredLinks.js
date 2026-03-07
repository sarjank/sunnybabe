// SunnyBabe — Sponsored Product Links (Phase 8)
// Weather-matched women's attire & accessories up to $50 + city-specific finds.
// Affiliate tag: phoenixsj-20

// ── Weather-bucket products ────────────────────────────────────────────────

const SPONSORED_LINKS = {
  stormy: [
    { label: 'Compact Travel Umbrella', emoji: '🌂', price: '$15–$35', url: 'https://www.amazon.com/s?k=compact+travel+umbrella+women+windproof&tag=phoenixsj-20' },
    { label: 'Waterproof Rain Jacket',  emoji: '🧥', price: '$35–$50', url: 'https://www.amazon.com/s?k=waterproof+rain+jacket+women&tag=phoenixsj-20' },
    { label: 'Rain Boot Booties',       emoji: '🥾', price: '$30–$50', url: 'https://www.amazon.com/s?k=waterproof+rain+boot+booties+women&tag=phoenixsj-20' },
  ],
  rainy: [
    { label: 'Stylish Clear Umbrella',  emoji: '☂️', price: '$18–$40', url: 'https://www.amazon.com/s?k=clear+bubble+umbrella+women+stylish&tag=phoenixsj-20' },
    { label: 'Women\'s Rain Jacket',    emoji: '🧥', price: '$35–$50', url: 'https://www.amazon.com/s?k=women+lightweight+rain+jacket+hooded&tag=phoenixsj-20' },
    { label: 'Waterproof Ankle Boots',  emoji: '👢', price: '$40–$50', url: 'https://www.amazon.com/s?k=waterproof+ankle+boots+women&tag=phoenixsj-20' },
  ],
  snowy: [
    { label: 'Insulated Snow Boots',    emoji: '🥾', price: '$40–$50', url: 'https://www.amazon.com/s?k=insulated+snow+boots+women+waterproof&tag=phoenixsj-20' },
    { label: 'Women\'s Puffer Vest',    emoji: '🧥', price: '$30–$50', url: 'https://www.amazon.com/s?k=women+puffer+vest+insulated&tag=phoenixsj-20' },
    { label: 'Thermal Fleece Leggings', emoji: '👖', price: '$20–$40', url: 'https://www.amazon.com/s?k=thermal+fleece+lined+leggings+women&tag=phoenixsj-20' },
  ],
  cold: [
    { label: 'Women\'s Puffer Jacket',  emoji: '🧥', price: '$40–$50', url: 'https://www.amazon.com/s?k=women+puffer+jacket+insulated+winter&tag=phoenixsj-20' },
    { label: 'Knit Beanie & Scarf Set', emoji: '🧣', price: '$20–$40', url: 'https://www.amazon.com/s?k=women+knit+beanie+scarf+set+winter&tag=phoenixsj-20' },
    { label: 'Touchscreen Gloves',      emoji: '🧤', price: '$15–$35', url: 'https://www.amazon.com/s?k=women+touchscreen+winter+gloves+warm&tag=phoenixsj-20' },
  ],
  chilly: [
    { label: 'Women\'s Fleece Pullover',emoji: '👕', price: '$25–$45', url: 'https://www.amazon.com/s?k=women+fleece+pullover+cozy&tag=phoenixsj-20' },
    { label: 'Chelsea Ankle Boots',     emoji: '👢', price: '$35–$50', url: 'https://www.amazon.com/s?k=women+chelsea+ankle+boots&tag=phoenixsj-20' },
    { label: 'Light Cardigan',          emoji: '🧥', price: '$20–$45', url: 'https://www.amazon.com/s?k=women+lightweight+open+front+cardigan&tag=phoenixsj-20' },
  ],
  mild: [
    { label: 'Women\'s Windbreaker',    emoji: '🧥', price: '$30–$50', url: 'https://www.amazon.com/s?k=women+lightweight+windbreaker+jacket&tag=phoenixsj-20' },
    { label: 'Slip-On Sneakers',        emoji: '👟', price: '$30–$50', url: 'https://www.amazon.com/s?k=women+slip+on+sneakers+comfortable&tag=phoenixsj-20' },
    { label: 'Denim Jacket',            emoji: '🧥', price: '$35–$50', url: 'https://www.amazon.com/s?k=women+denim+jacket+classic&tag=phoenixsj-20' },
  ],
  warm: [
    { label: 'Wide-Brim Sun Hat',       emoji: '👒', price: '$20–$45', url: 'https://www.amazon.com/s?k=women+wide+brim+sun+hat+uv+protection&tag=phoenixsj-20' },
    { label: 'Women\'s Sunglasses',     emoji: '🕶️', price: '$15–$45', url: 'https://www.amazon.com/s?k=women+sunglasses+uv400+trendy&tag=phoenixsj-20' },
    { label: 'Strappy Sandals',         emoji: '👡', price: '$25–$50', url: 'https://www.amazon.com/s?k=women+strappy+sandals+summer&tag=phoenixsj-20' },
  ],
  hot: [
    { label: 'UV-Protection Sunglasses',emoji: '🕶️', price: '$20–$50', url: 'https://www.amazon.com/s?k=women+polarized+sunglasses+uv+protection&tag=phoenixsj-20' },
    { label: 'Linen Wide-Leg Pants',    emoji: '👖', price: '$25–$45', url: 'https://www.amazon.com/s?k=women+linen+wide+leg+pants+summer&tag=phoenixsj-20' },
    { label: 'Straw Sun Hat',           emoji: '👒', price: '$18–$40', url: 'https://www.amazon.com/s?k=women+straw+sun+hat+beach+summer&tag=phoenixsj-20' },
  ],
};

// ── City / region-specific finds ───────────────────────────────────────────

const CITY_LINKS = [
  {
    cities: ['dallas','houston','austin','san antonio','fort worth','el paso','arlington','lubbock','corpus christi','plano','laredo','waco','amarillo'],
    label: 'Cowboy Hat Keychain', emoji: '🤠', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=mini+cowboy+hat+keychain+charm+texas&tag=phoenixsj-20',
  },
  {
    cities: ['new york','brooklyn','queens','manhattan','bronx','buffalo','yonkers','albany','staten island'],
    label: 'NYC Charm Bracelet', emoji: '🗽', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=new+york+nyc+charm+bracelet+souvenir&tag=phoenixsj-20',
  },
  {
    cities: ['mombasa','nairobi','kisumu','nakuru','eldoret'],
    label: 'Maasai Bead Bracelet', emoji: '📿', price: 'Under $18',
    url: 'https://www.amazon.com/s?k=maasai+beaded+bracelet+african&tag=phoenixsj-20',
  },
  {
    cities: ['milwaukee','madison','green bay','kenosha','racine','oshkosh','waukesha'],
    label: 'Cheese Charm Keychain', emoji: '🧀', price: 'Under $12',
    url: 'https://www.amazon.com/s?k=cheese+charm+keychain+wisconsin+souvenir&tag=phoenixsj-20',
  },
  {
    cities: ['chicago','naperville','rockford','aurora','joliet','peoria','elgin'],
    label: 'Chicago Bean Necklace', emoji: '🫘', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=chicago+bean+necklace+charm+souvenir&tag=phoenixsj-20',
  },
  {
    cities: ['los angeles','san francisco','san diego','sacramento','fresno','oakland','long beach','bakersfield','anaheim','santa ana','riverside','irvine'],
    label: 'Palm Tree Earrings', emoji: '🌴', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=palm+tree+earrings+women+california&tag=phoenixsj-20',
  },
  {
    cities: ['miami','orlando','tampa','jacksonville','fort lauderdale','tallahassee','st. petersburg','gainesville','clearwater','boca raton','pensacola'],
    label: 'Flamingo Charm', emoji: '🦩', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=flamingo+charm+bracelet+earrings+women&tag=phoenixsj-20',
  },
  {
    cities: ['honolulu','maui','hilo','kailua','kaneohe','pearl city'],
    label: 'Hibiscus Hair Clip', emoji: '🌺', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=hibiscus+flower+hair+clip+women&tag=phoenixsj-20',
  },
  {
    cities: ['nashville','memphis','knoxville','chattanooga','clarksville','murfreesboro'],
    label: 'Cowgirl Boot Charm', emoji: '👢', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=cowgirl+boot+charm+necklace+bracelet+women&tag=phoenixsj-20',
  },
  {
    cities: ['new orleans','baton rouge','shreveport','lafayette'],
    label: 'Mardi Gras Bead Necklace', emoji: '🟡', price: 'Under $12',
    url: 'https://www.amazon.com/s?k=mardi+gras+bead+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['seattle','tacoma','spokane','bellevue','redmond','kirkland','renton'],
    label: 'Raindrop Earrings', emoji: '🌧️', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=raindrop+teardrop+earrings+women&tag=phoenixsj-20',
  },
  {
    cities: ['boston','cambridge','worcester','lowell','brockton','quincy'],
    label: 'Lobster Charm Earrings', emoji: '🦞', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=lobster+charm+earrings+women&tag=phoenixsj-20',
  },
  {
    cities: ['denver','colorado springs','aurora','boulder','fort collins','lakewood','pueblo'],
    label: 'Mountain Crystal Necklace', emoji: '⛰️', price: 'Under $18',
    url: 'https://www.amazon.com/s?k=mountain+crystal+pendant+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['las vegas','henderson','reno','sparks','north las vegas'],
    label: 'Lucky Charm Bracelet', emoji: '🎲', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=lucky+charm+bracelet+women&tag=phoenixsj-20',
  },
  {
    cities: ['phoenix','tucson','mesa','scottsdale','tempe','chandler','gilbert','glendale','peoria'],
    label: 'Cactus Stud Earrings', emoji: '🌵', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=cactus+stud+earrings+women+desert&tag=phoenixsj-20',
  },
  {
    cities: ['atlanta','savannah','augusta','columbus','macon','sandy springs'],
    label: 'Peach Charm Necklace', emoji: '🍑', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=peach+charm+necklace+women+georgia&tag=phoenixsj-20',
  },
  {
    cities: ['new orleans'],
    label: 'Fleur-de-Lis Earrings', emoji: '⚜️', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=fleur+de+lis+earrings+women&tag=phoenixsj-20',
  },
  {
    cities: ['toronto','vancouver','montreal','calgary','edmonton','ottawa','winnipeg','quebec'],
    label: 'Maple Leaf Charm', emoji: '🍁', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=maple+leaf+charm+necklace+women+canada&tag=phoenixsj-20',
  },
  {
    cities: ['paris','lyon','marseille','toulouse','nice','bordeaux','lille','strasbourg'],
    label: 'Eiffel Tower Charm', emoji: '🗼', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=eiffel+tower+charm+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['london','manchester','birmingham','leeds','glasgow','liverpool','bristol','edinburgh','sheffield'],
    label: 'Crown Charm Necklace', emoji: '👑', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=crown+charm+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['tokyo','osaka','kyoto','yokohama','sapporo','nagoya','fukuoka','kobe'],
    label: 'Cherry Blossom Hairpin', emoji: '🌸', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=cherry+blossom+hair+pin+women+japanese&tag=phoenixsj-20',
  },
  {
    cities: ['sydney','melbourne','brisbane','perth','adelaide','gold coast','canberra'],
    label: 'Opal Stud Earrings', emoji: '💎', price: 'Under $18',
    url: 'https://www.amazon.com/s?k=opal+stud+earrings+women&tag=phoenixsj-20',
  },
  {
    cities: ['rome','milan','venice','florence','naples','turin','bologna','palermo'],
    label: 'Colosseum Charm', emoji: '🏛️', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=italian+colosseum+charm+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['madrid','barcelona','seville','valencia','bilbao','granada','malaga'],
    label: 'Flamenco Rose Hair Clip', emoji: '🌹', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=flamenco+rose+hair+flower+clip+women&tag=phoenixsj-20',
  },
  {
    cities: ['berlin','munich','hamburg','frankfurt','cologne','stuttgart','munich','dusseldorf'],
    label: 'Edelweiss Flower Pin', emoji: '🌼', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=edelweiss+flower+brooch+pin+women&tag=phoenixsj-20',
  },
  {
    cities: ['mexico city','cancun','guadalajara','monterrey','puebla','tijuana','acapulco'],
    label: 'Talavera Tile Keychain', emoji: '🏺', price: 'Under $14',
    url: 'https://www.amazon.com/s?k=talavera+ceramic+keychain+mexico&tag=phoenixsj-20',
  },
  {
    cities: ['bangkok','chiang mai','phuket','pattaya'],
    label: 'Elephant Charm Bracelet', emoji: '🐘', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=elephant+charm+bracelet+women+thai&tag=phoenixsj-20',
  },
  {
    cities: ['dubai','abu dhabi','sharjah'],
    label: 'Gold Evil Eye Bracelet', emoji: '🧿', price: 'Under $18',
    url: 'https://www.amazon.com/s?k=evil+eye+gold+bracelet+women&tag=phoenixsj-20',
  },
  {
    cities: ['istanbul','ankara','izmir'],
    label: 'Turkish Evil Eye Necklace', emoji: '🧿', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=turkish+evil+eye+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['cairo','alexandria','luxor','aswan','giza'],
    label: 'Ankh Pendant Necklace', emoji: '☥', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=egyptian+ankh+pendant+necklace+women&tag=phoenixsj-20',
  },
  {
    cities: ['cape town','johannesburg','durban','pretoria'],
    label: 'African Bead Bracelet', emoji: '📿', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=african+beaded+bracelet+women&tag=phoenixsj-20',
  },
  {
    cities: ['mumbai','delhi','bangalore','chennai','kolkata','hyderabad','pune','ahmedabad'],
    label: 'Bindi Jewel Set', emoji: '🔴', price: 'Under $15',
    url: 'https://www.amazon.com/s?k=bindi+jewel+forehead+sticker+women&tag=phoenixsj-20',
  },
  {
    cities: ['sao paulo','rio de janeiro','brasilia','salvador','fortaleza','curitiba'],
    label: 'Tropical Bead Bracelet', emoji: '🌺', price: 'Under $16',
    url: 'https://www.amazon.com/s?k=tropical+beaded+bracelet+colorful+women&tag=phoenixsj-20',
  },
  {
    cities: ['casablanca','marrakech','fez','rabat','tangier'],
    label: 'Berber Silver Bracelet', emoji: '🪬', price: 'Under $18',
    url: 'https://www.amazon.com/s?k=berber+silver+bracelet+moroccan+women&tag=phoenixsj-20',
  },
];

// Country-level fallbacks when no city keyword matches
const COUNTRY_LINKS = {
  CA: { label: 'Maple Leaf Charm',      emoji: '🍁', price: 'Under $14', url: 'https://www.amazon.com/s?k=maple+leaf+charm+necklace+women+canada&tag=phoenixsj-20' },
  FR: { label: 'Eiffel Tower Charm',    emoji: '🗼', price: 'Under $15', url: 'https://www.amazon.com/s?k=eiffel+tower+charm+necklace+women&tag=phoenixsj-20' },
  GB: { label: 'Crown Charm Necklace',  emoji: '👑', price: 'Under $16', url: 'https://www.amazon.com/s?k=crown+charm+necklace+women&tag=phoenixsj-20' },
  JP: { label: 'Cherry Blossom Hairpin',emoji: '🌸', price: 'Under $14', url: 'https://www.amazon.com/s?k=cherry+blossom+hairpin+women+japanese&tag=phoenixsj-20' },
  AU: { label: 'Opal Stud Earrings',    emoji: '💎', price: 'Under $18', url: 'https://www.amazon.com/s?k=opal+stud+earrings+women&tag=phoenixsj-20' },
  IT: { label: 'Italian Charm',         emoji: '🏛️', price: 'Under $15', url: 'https://www.amazon.com/s?k=italian+charm+bracelet+women&tag=phoenixsj-20' },
  ES: { label: 'Flamenco Rose Clip',    emoji: '🌹', price: 'Under $14', url: 'https://www.amazon.com/s?k=flamenco+rose+hair+clip+women&tag=phoenixsj-20' },
  DE: { label: 'Edelweiss Flower Pin',  emoji: '🌼', price: 'Under $14', url: 'https://www.amazon.com/s?k=edelweiss+flower+brooch+women&tag=phoenixsj-20' },
  MX: { label: 'Talavera Keychain',     emoji: '🏺', price: 'Under $14', url: 'https://www.amazon.com/s?k=talavera+ceramic+keychain+mexico&tag=phoenixsj-20' },
  TH: { label: 'Elephant Charm',        emoji: '🐘', price: 'Under $14', url: 'https://www.amazon.com/s?k=elephant+charm+bracelet+women+thai&tag=phoenixsj-20' },
  AE: { label: 'Gold Evil Eye Bracelet',emoji: '🧿', price: 'Under $18', url: 'https://www.amazon.com/s?k=evil+eye+gold+bracelet+women&tag=phoenixsj-20' },
  TR: { label: 'Evil Eye Necklace',     emoji: '🧿', price: 'Under $16', url: 'https://www.amazon.com/s?k=turkish+evil+eye+necklace+women&tag=phoenixsj-20' },
  EG: { label: 'Ankh Pendant',          emoji: '☥',  price: 'Under $16', url: 'https://www.amazon.com/s?k=egyptian+ankh+pendant+necklace+women&tag=phoenixsj-20' },
  ZA: { label: 'African Bead Bracelet', emoji: '📿', price: 'Under $16', url: 'https://www.amazon.com/s?k=african+beaded+bracelet+women&tag=phoenixsj-20' },
  IN: { label: 'Bindi Jewel Set',       emoji: '🔴', price: 'Under $15', url: 'https://www.amazon.com/s?k=bindi+jewel+forehead+sticker+women&tag=phoenixsj-20' },
  BR: { label: 'Tropical Bead Bracelet',emoji: '🌺', price: 'Under $16', url: 'https://www.amazon.com/s?k=tropical+beaded+bracelet+colorful+women&tag=phoenixsj-20' },
  MA: { label: 'Berber Silver Bracelet',emoji: '🪬', price: 'Under $18', url: 'https://www.amazon.com/s?k=berber+silver+bracelet+moroccan+women&tag=phoenixsj-20' },
  KE: { label: 'Maasai Bead Bracelet',  emoji: '📿', price: 'Under $18', url: 'https://www.amazon.com/s?k=maasai+beaded+bracelet+african&tag=phoenixsj-20' },
};

// ── Helper functions ───────────────────────────────────────────────────────

function getWeatherBucket(type, tempF) {
  if (type === 'stormy')                return 'stormy';
  if (type === 'rainy')                 return 'rainy';
  if (type === 'snowy' || tempF < 32)   return 'snowy';
  if (tempF < 50)                       return 'cold';
  if (tempF < 60)                       return 'chilly';
  if (tempF < 70)                       return 'mild';
  if (tempF < 80)                       return 'warm';
  return 'hot';
}

// Returns up to `count` weather-matched product objects
function getSponsoredLinks(type, tempF, count) {
  const bucket = getWeatherBucket(type, tempF);
  return (SPONSORED_LINKS[bucket] || []).slice(0, count);
}

// Returns a city/state-specific product object, or null if no match found
function getCityLink(cityName, countryCode) {
  const name    = (cityName    || '').toLowerCase();
  const country = (countryCode || '').toUpperCase();

  for (const entry of CITY_LINKS) {
    if (entry.cities.some(k => name.includes(k))) {
      return { label: entry.label, emoji: entry.emoji, price: entry.price, url: entry.url };
    }
  }

  return COUNTRY_LINKS[country] || null;
}
