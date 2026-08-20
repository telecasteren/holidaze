import z from "zod";

export const loginAuthSchema = z.object({
  email: z.string(),
  password: z.string(),
  accessToken: z.string(),
});

export const signupAuthSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type LoginProfile = z.infer<typeof loginAuthSchema>;
export type SignupProfile = z.infer<typeof signupAuthSchema>;

// API response REGISTER:
// "data": {
//     "name": "tele_user1",
//     "email": "tele_user1@stud.noroff.no",
//     "bio": null,
//     "avatar": {
//         "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
//         "alt": "A blurry multi-colored rainbow background"
//     },
//     "banner": {
//         "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
//         "alt": "A blurry multi-colored rainbow background"
//     }
// },
// "meta": {}
//
// API response LOGIN:
//     "data": {
//     "name": "tele_user1",
//     "email": "tele_user1@stud.noroff.no",
//     "bio": null,
//     "avatar": {
//         "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=400&w=400",
//         "alt": "A blurry multi-colored rainbow background"
//     },
//     "banner": {
//         "url": "https://images.unsplash.com/photo-1579547945413-497e1b99dac0?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=80&h=500&w=1500",
//         "alt": "A blurry multi-colored rainbow background"
//     },
//     "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVsZV91c2VyMSIsImVtYWlsIjoidGVsZV91c2VyMUBzdHVkLm5vcm9mZi5ubyIsImlhdCI6MTc4NzIwODc1N30.-e0XJKmbHI6ia_bX1d5X3DTiR74RxMFigj3KwAvfMeA"
// },
// "meta": {}
