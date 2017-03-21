Officer = {
	login : function(profile,auth_type,cb)
	{
        if (auth_type=="cas") {
			if (!profile.username) cb({});
			var mail=profile.username.toLowerCase();
			Officer.using('db').store('bpclight','select kage,nom,prenom from agents where kage in (select kage from mela where libmela="'+mail+'")',function(err,result){
				if (!err) {
					var response={
						lastname: result.data[0].nom,
						firstname: result.data[0].prenom,
						uid: result.data[0].kage,
						mail: mail,
						profiles: Officer.getProfile(mail.split('@')[0])
					};
					cb(response);			
				} else cb(err);
			});
		};
		if (auth_type=="google") {
			/* 
			profile.username.id
			profile.username.email
			profile.username.verified_email
			profile.username.name
			profile.username.given_name
			profile.username.family_name
			profile.username.link
			profile.username.gender
			profile.username.locale
			
			profile=profile.username;
            */
            
			var mail=profile.username.email;
			Officer.using('db').store('bpclight','select kage,nom,prenom from agents where kage in (select kage from mela where libmela="'+mail+'")',function(err,result){
				if (!err) {
                    var response={
						lastname: result.data[0].nom,
						firstname: result.data[0].prenom,
						uid: result.data[0].kage,
						mail: mail,
						profiles: Officer.getProfile(mail.split('@')[0])
					};
					cb(response);			
				} else cb(err);
			});
		}
		
	}
};

module.exports = Officer;