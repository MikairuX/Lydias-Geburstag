export let vouchers;


export function loadFromStorage(){
  vouchers = JSON.parse(localStorage.getItem('vouchers')) 

  if(!vouchers){
    vouchers = [{
  name: 'mit Michael zur Tanzparty',
  quantity: 3
  },
  {
    name: 'Cola kaufen',
    quantity : 5
  },
  {
    name: 'Picnicken mit Michael',
    quantity: 3
  },
  {
    name: 'Meggis ausgegeben bekommen',
    quantity: 1
  },
  {
    name: 'KFC ausgegenben bekommen',
    quantity: 1
  },{
    name: 'kusseln',
    quantity: 11957197509175
  },
  {
    name: 'kuss',
    quantity: 91069286029928
  },
  {
    name: ' 15 min Massage',
    quantity: 3
  },
  {
    name: 'Fotoshooting',
    quantity: 5
  },
  {
    name: 'Sonnenuntergang anschauen',
    quantity: 5
  },
  {
    name: 'Im Regen tanzen',
    quantity: 4
  },
  {
    name: 'gemeinsam Kochen',
    quantity: 3
  }
  ];
  }
}




