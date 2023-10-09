const config = {
	server: {
		port: 8086,
	},
	db: {
		host: "bp6ljjungnbzs99fqlip-mysql.services.clever-cloud.com",
		port: 3306,
		user: "ulprfx1wf64cwpv1",
		name: "bp6ljjungnbzs99fqlip",
		password: "YzB5TknvBVV7Otrt6Z5J",
	},
	environment: "development",
	tokenInfo: {
		accessTokenValidityDays: parseInt(
			"7d"
		),
		refreshTokenValidityDays: parseInt(
		 "2d"
		),
		issuer:"nick.co",
		audience:"users",
	},
  corsConfig:{
    url:"http://localhost:8086"
  }
};
export default config;
