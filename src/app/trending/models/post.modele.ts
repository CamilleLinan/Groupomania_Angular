export class User {
    _id!: string;
    firstname!: string;
    lastname!: string;
    email!: string;
    password!: string;
    userPicture!: string;
    isAdmin!: boolean;
}

export class Post {
    _id!: string;
    posterId!: string;
    message!: string;
    postPicture?: string;
    likes!: number;
    usersLiked!: [];
    createdAt!: Date;
    User!: User[];
}