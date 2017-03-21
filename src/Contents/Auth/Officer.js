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
			profile.id
			profile.email
			profile.verified_email
			profile.name
			profile.given_name
			profile.family_name
			profile.link
			profile.gender
			profile.locale
			
			profile=profile.username;
            */
			var mail=profile.email;
			Officer.using('db').store('bpclight','select kage,nom,prenom from agents where kage in (select kage from mela where libmela="'+mail+'")',function(err,result){
				if (!err) {
                    var response={
						lastname: result.data[0].nom,
						firstname: result.data[0].prenom,
						//uid: result.data[0].kage,
						mail: mail,
						profiles: Officer.getProfile(mail.split('@')[0])
					};
					cb(response);			
				} else cb(err);
			});/*
			var response={
						mail: mail
            };
            cb(response);	*/
		}
		
	}
};

module.exports = Officer;