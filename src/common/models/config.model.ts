export type IConfigProps = {
  port: number;
  devMode: boolean;
  defaultClientPhoto: string;
  defaultVeterinarianPhoto: string;
  generatePostmanCollection: boolean;
  api: ApiConfigProps;
  salt: string;
  database: DatabaseConfigProps;
  jwt: JwtConfigProps;
  encryption: EncryptionConfigProps;
  cookie: CookieConfigProps;
  cors: CorsConfigProps;
  nodemailer: NodeMailerConfigProps;
};

type ApiConfigProps = {
  frontUrl: string;
  httpTimeout: number;
};

type DatabaseConfigProps = {
  host: string;
  port: number;
  user: string;
  password: string;
  databaseName: string;
};

type JwtConfigProps = {
  private: string;
  public: string;
  expiresIn: number;
  algorithm: 'RS256' | 'HS256';
};

type EncryptionConfigProps = {
  password: string;
  salt: string;
  iv: string;
};

type CookieConfigProps = {
  secret: string;
  secure: boolean;
  httpOnly: boolean;
  domain: string;
  path: string;
};

type CorsConfigProps = {
  origin: string;
};

type NodeMailerConfigProps = {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  mailDev?: string;
};
