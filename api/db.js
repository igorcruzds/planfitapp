// In-memory mock database — replace with MongoDB models in the future

const db = {
  users: [
    { id:'u1',  name:'Maria Fernanda', av:'🌸', streak:38, level:5, levelName:'Avançado III',   vip:false, plan:'planfit', highlight:true },
    { id:'u2',  name:'Ana Costa',      av:'💎', streak:36, level:5, levelName:'Avançado II',    vip:true,  plan:'vip' },
    { id:'u3',  name:'Julia Ramos',    av:'🌿', streak:35, level:4, levelName:'Intermediário III', vip:false, plan:'planfit' },
    { id:'u4',  name:'Carla M.',       av:'⚡', streak:33, level:3, levelName:'Intermediário II',  vip:false, plan:'planfit' },
    { id:'u5',  name:'Bia Santos',     av:'🔥', streak:30, level:2, levelName:'Iniciante III',  vip:false, plan:'planfit' },
    { id:'u6',  name:'Fernanda L.',    av:'💪', streak:28, level:2, levelName:'Intermediário I', vip:false, plan:'planfit' },
    { id:'u7',  name:'Paula K.',       av:'🌟', streak:25, level:4, levelName:'Avançado I',     vip:true,  plan:'vip' },
    { id:'u8',  name:'Cris V.',        av:'🍃', streak:22, level:1, levelName:'Iniciante II',   vip:false, plan:'planfit' },
    { id:'u9',  name:'Lara T.',        av:'🌺', streak:34, level:4, levelName:'Avançado I',     vip:true,  plan:'vip' },
    { id:'u10', name:'Gabi M.',        av:'✨', streak:29, level:3, levelName:'Intermediário II', vip:true, plan:'vip' },
  ],

  posts: [
    {
      id:'p1', userId:'u1', nm:'Maria Fernanda', av:'🌸', avatar_url:null, vip:false,
      time:'2h', workout:'Avançado III',
      caption:'Treino concluído hoje! 💪 Dia 38 de consistência. O corpo está mudando e a mente também.',
      likes:24, liked:false,
      comments:[
        { id:'c101', av:'⚡', avatar_url:null, nm:'Carla M.', text:'Arrasando! Estou no dia 30 🔥', time:'1h', replies:[], showReplyInput:false, replyInput:'' },
      ],
      showComments:false, commentInput:'', lang:'pt', createdAt:new Date(Date.now()-3600000),
    },
    {
      id:'p2', userId:'u2', nm:'Ana Costa', av:'💎', avatar_url:null, vip:true,
      time:'5h', workout:'Avançado II',
      caption:'Treino feito ⭐ Dica da semana: treinar de manhã cedo mudou tudo para mim. Energia o dia todo!',
      likes:47, liked:false,
      comments:[
        { id:'c201', av:'🌿', avatar_url:null, nm:'Julia R.', text:'Concordo 100%! Manhã é sagrada 🙌', time:'4h', replies:[], showReplyInput:false, replyInput:'' },
      ],
      showComments:false, commentInput:'', lang:'pt', createdAt:new Date(Date.now()-7200000),
    },
    {
      id:'p3', userId:'u3', nm:'Julia Ramos', av:'🌿', avatar_url:null, vip:false,
      time:'1d', workout:'Intermediário III',
      caption:'Treino glúteo hoje! 🍑 Fui do zero ao Intermediário 3 em 4 meses. O app me manteve no caminho quando queria desistir. Obrigada!',
      likes:89, liked:false,
      comments:[], showComments:false, commentInput:'', lang:'pt', createdAt:new Date(Date.now()-86400000),
    },
  ],

  comments: [],

  ranking: [
    { userId:'u1', streak:38, level:5, updatedAt:new Date() },
    { userId:'u2', streak:36, level:5, updatedAt:new Date() },
    { userId:'u9', streak:34, level:4, updatedAt:new Date() },
    { userId:'u3', streak:35, level:4, updatedAt:new Date() },
    { userId:'u10',streak:29, level:3, updatedAt:new Date() },
    { userId:'u4', streak:33, level:3, updatedAt:new Date() },
    { userId:'u5', streak:30, level:2, updatedAt:new Date() },
    { userId:'u7', streak:25, level:4, updatedAt:new Date() },
    { userId:'u6', streak:28, level:2, updatedAt:new Date() },
    { userId:'u8', streak:22, level:1, updatedAt:new Date() },
  ],
};

module.exports = { db };
