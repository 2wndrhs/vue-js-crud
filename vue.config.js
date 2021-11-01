module.exports = {
    publicPath: '/absproxy/8081',

    devServer: {
		public: '34.64.216.102',
		sockPath: "/absproxy/8081/sockjs-node",
		port: 8081,
		disableHostCheck: true,
		overlay: false
	},

    transpileDependencies: [
      'vuetify'
    ]
} 
