let emails=document.querySelectorAll('a.esc[href^="mailto:"]');
emails.forEach(function(el){
	let email=el.innerHTML;
	let novo='';
	for(var i=1;i<email.length;i+=2){
		if(email[i]=='@' || email[i]=='.' || email[i-1]=='@' || email[i-1]=='.'){
			novo+=email[i-1]+email[i];
		}else{
			novo+=email[i]+email[i-1];
		}
	}
	if(novo.length<email.length){
		novo+=email[email.length-1];
	}
	el.innerHTML=novo;
	el.style.opacity=1;
	email=el.getAttribute('href').replace('mailto:','');
	novo='';
	for(var i=1;i<email.length;i+=2){
		if(email[i]=='@' || email[i]=='.' || email[i-1]=='@' || email[i-1]=='.'){
			novo+=email[i-1]+email[i];
		}else{
			novo+=email[i]+email[i-1];
		}
	}
	if(novo.length<email.length){
		novo+=email[email.length-1];
	}
	el.setAttribute('href','mailto:'+novo);
	el.setAttribute('title',novo);
});
$(window).on('load',function(){
    if($('.elfsight').length>0){
        $('.elfsight').attr('class',$('.elfsight').attr('data-id')).after('<script src="https://apps.elfsight.com/p/platform.js" defer></script>');
    }

    //GALERIA PARA PÁGINA DE PRODUTOS
	$('.galeria__produto').lightSlider({
        gallery:true,
        item:1,
        loop:true,
        thumbItem:6,
        slideMargin:0,
        enableDrag: false,
        currentPagerPosition:'left',
        onSliderLoad: function(el) {
            el.lightGallery({
                selector: '.galeria__produto .lslide'
            });
        }   
    });  

	//INICIA A GALERIA A PARTIR DE UM BANNER ILUSTRATIVO
	$('.galeria_proximo').click(function(e){
		e.preventDefault();
		$(this).next().find('a').eq(0).click();
	});
	
	//FIX DO MENU
	$('#menuResponsivo a').click(function(e){
		var link=$(this).attr('href');
		var dominio='/';
		if(location.host=='www.eleve.me'){
			var tmp=link.split(new RegExp('/|#','g'))
			link=link.replace('/'+tmp[1],'');
			dominio='/'+tmp[1];
		}
		if(link.charAt(0)=='#' && $(link).length==0){
			window.location=dominio+link;
		}
	});
	
	//FECHA MENU MOBILE AO CLICAR
	$(function(){
		$('.navbar-collapse .navbar-nav a').click(function(e){
			if($(window).width() < 992){
				$('.navbar-toggler').click();
			}
		});
	});

	// //TOOLTIP
	// $(function(){
	//   $('[data-toggle="tooltip"]').tooltip();
	// });

	// //TOOLTIP
	// if(!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)){
	// 	$('[data-toggle="tooltip"]').tooltip();
	// }

	// //TOOLTIP
	// var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	// var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
	// 	return new bootstrap.Tooltip(tooltipTriggerEl)
	// })

	//MASKED INPUT
	$(".cnpj").mask("99.999.999/9999-99");
	$(".cpf").mask("999.999.999-99");
	$(".rg").mask("9.999.999-9");
	$(".cep").mask("99999-999");
	$(".data").mask("99/99/9999");
	if($('.valor').length>0){
		$('.valor').priceFormat({
			allowNegative: true,
			prefix: 'R$ ',
			centsSeparator: ',',
			thousandsSeparator: '.'
		});
	}

	$('.telefone').mask("(99) 99999-999?9").focusout(function(event){
		var target, phone, element;
		target = (event.currentTarget) ? event.currentTarget : event.srcElement;
		phone = target.value.replace(/\D/g, '');
		element = $(target);
		element.unmask();
		if(phone.length > 10 || phone.length==0){
			element.mask("(99) 99999-999?9");
		}else{
			element.mask("(99) 9999-9999?9");
		}
		element.change();
	});
	
	$('.telefone').focusout();

	$('.amplia').lightGallery({
		thumbnail:true,
		selector:'a',
		getCaptionFromTitleOrAlt:false,
		showThumbByDefault:false
	});

	//MENU DOTS VERTICAL
	var contentSections = $('.cd-section'),
		navigationItems = $('#cd-vertical-nav a');

	if($('.popup__entrada').length>0){
		$('.popup__entrada').addClass('abriu');
		new bootstrap.Modal($('.popup__entrada')[0]).show();
		$('.popup__entrada')[0].addEventListener('hide.bs.modal',function(e){
			$.ajax({
				url:'?fechapopup='+$(this).closest('.modal').attr('data-codigo'),
	            dataType:'text',
	            type:'GET'
	        });
		});
	}
	if($('.popup__saida').length>0){
		$(document).on('pointerleave',function(e){
			if($('.modal.show').length==0 && !$('.popup__saida').hasClass('abriu')){
				$('.popup__saida').addClass('abriu');
				new bootstrap.Modal($('.popup__saida')[0]).show();
			}
		});
	}
	var anterior=$(window).scrollTop();
	updateNavigation();
	$(window).on('scroll', function(){
		updateNavigation();
		//ALTERA O MENU AO DAR SCROLL
		if( $(window).scrollTop() > ($('.navbar').height()*2) ){		
			$(".navbar").addClass("reduz");
		} else {
			$(".navbar").removeClass("reduz");
		}				
		//FUNÇÃO PARA VOLTAR AO TOPO
		if($(this).scrollTop() != 0){
			$('#toTop').stop(true,false).fadeIn();
		}else{
			$('#toTop').stop(true,false).fadeOut();
		}
		//POPUP DE ROLAGEM
		if($('.popup__rolagem').length>0 && !$('.popup__rolagem').hasClass('abriu') && $('.modal.show').length==0 && ($('.popup__entrada').length==0 || $('.popup__entrada').hasClass('abriu')) && anterior<($(document).height()/2) && $(window).scrollTop() >= ($(document).height()/2) ){
			$('.popup__rolagem').addClass('abriu');
			new bootstrap.Modal($('.popup__rolagem')[0]).show();
			$('.popup__rolagem')[0].addEventListener('hide.bs.modal',function(e){
				$.ajax({
					url:'?fechapopup='+$(this).closest('.modal').attr('data-codigo'),
		            dataType:'text',
		            type:'GET'
		        });
			});
		}
		anterior=$(window).scrollTop();
	});
	$(window).scroll();

	navigationItems.on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    $('.cd-scroll-down').on('click', function(event){
        event.preventDefault();
        smoothScroll($(this.hash));
    });
    $('.touch .cd-nav-trigger').on('click', function(){
    	$('.touch #cd-vertical-nav').toggleClass('open');

    });
    $('.touch #cd-vertical-nav a').on('click', function(){
    	$('.touch #cd-vertical-nav').removeClass('open');
    });

	function updateNavigation() {
		contentSections.each(function(){
			$this = $(this);
			var activeSection = $('#cd-vertical-nav a[href="#'+$this.attr('id')+'"]').data('number') - 1;
			if ( ( $this.offset().top - $(window).height()/2 < $(window).scrollTop() ) && ( $this.offset().top + $this.height() - $(window).height()/2 > $(window).scrollTop() ) ) {
				navigationItems.eq(activeSection).addClass('is-selected');
			}else {
				navigationItems.eq(activeSection).removeClass('is-selected');
			}
		});
	}

	//SCROLL REVEAL
	window.sr = ScrollReveal();

	sr.reveal('.revelaBanner', {
		origin: 'left',
		distance: '150px',
		scale: 1,
		reset: true,
		duration: 2000
	}, 200);

	sr.reveal('.revelaIntervalo', {
		origin: 'bottom',
		distance: '20px',
		scale: 0.9,
		reset: false,
		duration: 200,
	}, 200);

	// sr.reveal('.revela', {
	// 	origin: 'bottom',
	// 	distance: '20px',
	// 	duration: 500,
	// 	delay: 0,
	// 	rotate: { x: 0, y: 0, z: 0 },
	// 	opacity: 0,
	// 	scale: 0.9,
	// 	easing: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
	// 	container: window.document.documentElement,
	// 	mobile: true,
	// 	reset: false,
	// 	useDelay: 'always',
	// 	viewFactor: 0.2,
	// 	viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
	// });

	sr.reveal('.revela', {
		origin: 'bottom',
		distance: '50px',
		duration: 1000,
		delay: 0,
		interval: 80,
		rotate: { x: 0, y: 0, z: 0 },
		opacity: 0,
		scale: 1,
		easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
		container: window.document.documentElement,
		mobile: true,
		reset: false,
		useDelay: 'always',
		viewFactor: 0,
		viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
	});


	//SWIPER SLIDER BANNER
	if($('.swiper-banner').length > 0){
		var mySwiper = new Swiper('.swiper-banner', {
			speed: 800,
			loop: false,
			effect: 'fade',
			watchOverflow: true,
			grabCursor: true,

			keyboard: {
		        enabled: true,
		      },

			autoplay: {
			    delay: 5000,
			    disableOnInteraction: false,
			  },

			pagination: {
				el: '.swiper-pagination',
				dynamicBullets: true,
			},

			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			}
		});
	}

	//SWIPER SLIDER DEPOIMENTOS
	if($('.swiper-depoimentos').length > 0){
		var mySwiper = new Swiper('.swiper-depoimentos', {
			slidesPerView: 1,
			speed: 1500,
			delay: 5000,
			loop: true,
			watchOverflow: true,
			grabCursor: true,
			autoHeight: true,
			autoplay: {
			    delay: 10000,
			  },
		});
	}

	//SWIPER SLIDER CLIENTES E PARCEIROS
	if($('.swiper-parceiros').length > 0){
		var mySwiper = new Swiper('.swiper-parceiros', {
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			loopFillGroupWithBlank: true,
			loopAdditionalSlides: 10,
			watchOverflow: true,
			autoHeight: true,
			autoplay: {
			    delay: 2000,
			  },

			breakpoints: {
				768: {
					slidesPerView: 2
				},
				992: {
					slidesPerView: 4
				},
				1200: {
					slidesPerView: 6
				}
			}
		});
	}

	//SWIPER SLIDER EQUIPE
	if($('.swiper-equipe').length > 0){
		var mySwiper = new Swiper('.swiper-equipe', {
			slidesPerView: 1,
			speed: 1000,
			loop: true,
			loopFillGroupWithBlank: true,
			loopAdditionalSlides: 10,
			watchOverflow: true,
			autoHeight: true,

			autoplay: {
			    delay: 2000,
			  },

			breakpoints: {
				768: {
					slidesPerView: 2
				},
				992: {
					slidesPerView: 3
				},
				1200: {
					slidesPerView: 4
				}
			}
		});
	}

	//SWIPER SLIDER EVENTOS
	if($('.swiper-eventos').length > 0){
		var mySwiper = new Swiper('.swiper-eventos', {
			slidesPerView: 4,
			spaceBetween: 30,
			speed: 900,
			watchSlidesVisibility: true,
			autoplay: {
			    delay: 2000,
			  },
			breakpoints: {
				768: {
					slidesPerView: 2
				},
				992: {
					slidesPerView: 2
				},
				1200: {
					slidesPerView: 4
				}
			}
		});
	}

	//SWIPER SLIDER ÁLBUM
	if($('.swiper-album').length > 0){
		var mySwiper = new Swiper('.swiper-album', {
			slidesPerView: 1,
			speed: 1000,
			loop: false,
			loopFillGroupWithBlank: true,
			loopAdditionalSlides: 10,
			watchOverflow: true,
			autoHeight: true,

			autoplay: {
			    delay: 2000,
			  },

			breakpoints: {
				768: {
					slidesPerView: 2
				},
				992: {
					slidesPerView: 4
				},
				1200: {
					slidesPerView: 6
				}
			}
		});
	}

	//SWIPER SLIDER GALERIA
	if($('.swiper-galeria').length > 0){
		var mySwiper = new Swiper('.swiper-galeria', {
			slidesPerView: 3,
			speed: 900,
			loadPrevNext: true,
			preloadImages: false,
			lazy: true,
			watchSlidesVisibility: true,
			centeredSlides: true,
			centeredSlidesBounds: true,

			pagination: {
		        el: '.swiper-pagination',
		        type: 'progressbar',
		      },

			autoplay: {
			    delay: 2000,
			  },
		});
	}

	//SCRIPT PARA GALERIA TIPO 2
    $('.sliderGaleria').lightSlider({
		autoWidth:true,
		pager:false,
		slideMargin:0,
		onSliderLoad: function(el) {
            el.lightGallery({
                selector: '.sliderGaleria .lslide'
            });
        }  
    });
    
	//LIGHTGALLERY
	//SCRIPT PARA GALERIA TIPO 4
	$('.galeria').each(function(idx,el){
		$(this).lightGallery({
			thumbnail:true,
			selector:'a',
			getCaptionFromTitleOrAlt:false,
			showThumbByDefault:false
		});
	});

	//FECHA SECTION AO CONCORDAR COM POLÍTICAS
	$('.btn-concordo').on('click',function(e){
		$('#politica').fadeOut();
		$.ajax({
			url:'?aceito=S',
            dataType:'text',
            type:'GET'
        });
	});

	//VALIDACAO DE FORMLARIOS DE CONTATO
	function trataSubmit(event){
		this.classList.remove('invalido');
		if (this.checkValidity() === false){
			this.classList.add('invalido');
			event.preventDefault();
			event.stopPropagation();
		}else{
			$(this).find('[type=submit]').attr('disabled','disabled').addClass('btn-secondary');
		}
		this.classList.add('was-validated');
	}
	$('.needs-validation').on('submit',trataSubmit);
	var modal_resultado=null;
	if($('#modal_resultado').length==0){
		$('body').append(
			'<div class="modal fade" id="modal_resultado" tabindex="-1" role="dialog" aria-labelledby="Resultado" aria-hidden="true">'+
				'<div class="modal-dialog modal-dialog-centered" role="document">'+
					'<div class="modal-content">'+
						'<div class="modal-header">'+
							'<h5 class="modal-title"></h5>'+
							'<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+
						'</div>'+
						'<div class="modal-body"></div>'+
					'</div>'+
				'</div>'+
			'</div>'
		);
	}
	modal_resultado=new bootstrap.Modal($('#modal_resultado')[0],{keyboard:false});
	function ajaxSubmit(e){
		e.preventDefault();
		if(this.getAttribute('id')=='form_lead'){
			let dados='lead=1&nome='+$('#lead_nome').val()+'&email='+$('#lead_email').val()+'&telefone='+$('#lead_telefone').val();
		}else{
			let dados='formulario=consorcio&nome='+$(this).find('[name=nome]').val()+'&email='+$(this).find('[name=email]').val()+'&telefone='+$(this).find('[name=telefone]').val()+'&area='+$(this).find('[name=area]').val()+'&credito='+$(this).find('[name=credito]').val();
		}
		if($(this).find(':invalid').length==0){
			console.log('blablabla');
			$.ajax({
				url:location.href,
				dataType:'text',
				type:'POST',
				data:dados,
				success:function(data){
					$('[data-dismiss=modal]').click();
					$('[type=submit]').removeAttr('disabled').removeClass('btn-secondary');
					if(data=='ok'){
						$('#modal_resultado').find('.modal-title').html('Sucesso');
						$('#modal_resultado').find('.modal-body').html('Muito obrigado! Sua solicitação foi enviada com sucesso e em breve entraremos em contato.');
					}else{
						$('#modal_resultado').find('.modal-title').html('Aviso');
						$('#modal_resultado').find('.modal-body').html('Ocorreu um erro ao enviar sua solicitação. Por favor, recarregue a página e tente novamente.');
					}
					modal_resultado.show();
				},error:function(xhr,ajaxOptions,thrownError){
					$('[data-dismiss=modal]').click();
					$('[type=submit]').removeAttr('disabled').removeClass('btn-secondary');
					$('#modal_resultado').find('.modal-title').html('Aviso');
					$('#modal_resultado').find('.modal-body').html('Ocorreu um erro ao enviar sua solicitação. Por favor, recarregue a página e tente novamente.');
					modal_resultado.show();
				}
			});
		}
	}
	$('.ajax_formulario').on('submit',ajaxSubmit);
	var ajax=null;
	$('.addorcamento').click(function(e){
		$('#orcamento tbody').append(
			'<tr>'+
				'<td class="align-middle">'+$(this).attr('data-nome')+'</td>'+
				'<td>'+
					'<input type="number" name="produtos['+$(this).attr('data-codigo')+']" value="1" class="form-control" placeholder="1" min="1">'+
					'<input type="hidden" name="nomes['+$(this).attr('data-codigo')+']" value="'+$(this).attr('data-nome')+'">'+
				'</td>'+
				'<td><button type="button" class="btn btn-danger float-end delorcamento" data-toggle="tooltip" data-placement="right" title="Remover este item" data-codigo="'+$(this).attr('data-codigo')+'"><svg class="bi bi-dash-circle-dotted" xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0c-.176 0-.35.006-.523.017l.064.998a7.117 7.117 0 0 1 .918 0l.064-.998A8.113 8.113 0 0 0 8 0zM6.44.152c-.346.069-.684.16-1.012.27l.321.948c.287-.098.582-.177.884-.237L6.44.153zm4.132.271a7.946 7.946 0 0 0-1.011-.27l-.194.98c.302.06.597.14.884.237l.321-.947zm1.873.925a8 8 0 0 0-.906-.524l-.443.896c.275.136.54.29.793.459l.556-.831zM4.46.824c-.314.155-.616.33-.905.524l.556.83a7.07 7.07 0 0 1 .793-.458L4.46.824zM2.725 1.985c-.262.23-.51.478-.74.74l.752.66c.202-.23.418-.446.648-.648l-.66-.752zm11.29.74a8.058 8.058 0 0 0-.74-.74l-.66.752c.23.202.447.418.648.648l.752-.66zm1.161 1.735a7.98 7.98 0 0 0-.524-.905l-.83.556c.169.253.322.518.458.793l.896-.443zM1.348 3.555c-.194.289-.37.591-.524.906l.896.443c.136-.275.29-.54.459-.793l-.831-.556zM.423 5.428a7.945 7.945 0 0 0-.27 1.011l.98.194c.06-.302.14-.597.237-.884l-.947-.321zM15.848 6.44a7.943 7.943 0 0 0-.27-1.012l-.948.321c.098.287.177.582.237.884l.98-.194zM.017 7.477a8.113 8.113 0 0 0 0 1.046l.998-.064a7.117 7.117 0 0 1 0-.918l-.998-.064zM16 8a8.1 8.1 0 0 0-.017-.523l-.998.064a7.11 7.11 0 0 1 0 .918l.998.064A8.1 8.1 0 0 0 16 8zM.152 9.56c.069.346.16.684.27 1.012l.948-.321a6.944 6.944 0 0 1-.237-.884l-.98.194zm15.425 1.012c.112-.328.202-.666.27-1.011l-.98-.194c-.06.302-.14.597-.237.884l.947.321zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a6.999 6.999 0 0 1-.458-.793l-.896.443zm13.828.905c.194-.289.37-.591.524-.906l-.896-.443c-.136.275-.29.54-.459.793l.831.556zm-12.667.83c.23.262.478.51.74.74l.66-.752a7.047 7.047 0 0 1-.648-.648l-.752.66zm11.29.74c.262-.23.51-.478.74-.74l-.752-.66c-.201.23-.418.447-.648.648l.66.752zm-1.735 1.161c.314-.155.616-.33.905-.524l-.556-.83a7.07 7.07 0 0 1-.793.458l.443.896zm-7.985-.524c.289.194.591.37.906.524l.443-.896a6.998 6.998 0 0 1-.793-.459l-.556.831zm1.873.925c.328.112.666.202 1.011.27l.194-.98a6.953 6.953 0 0 1-.884-.237l-.321.947zm4.132.271a7.944 7.944 0 0 0 1.012-.27l-.321-.948a6.954 6.954 0 0 1-.884.237l.194.98zm-2.083.135a8.1 8.1 0 0 0 1.046 0l-.064-.998a7.11 7.11 0 0 1-.918 0l-.064.998zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-7z"/></svg></button></td>'+
			'</tr>'
		);
		$(this).closest('li').addClass('disabled');
		$('#nenhum').addClass('disabled');
		$(this).blur();
		atualiza_orcamento();
	});
	$(document).on('click','.delorcamento',function(e){
		$('#p_'+$(this).attr('data-codigo')).removeClass('disabled');
		if($(this).closest('table').find('.delorcamento').length==1)
			$('#nenhum').removeClass('disabled');
		$(this).closest('tr').remove();
		atualiza_orcamento();
	});
	$(document).on('change','#formulario_orcamento input,#formulario_orcamento textarea',function(e){
		atualiza_orcamento();
	});
	$('#formulario_orcamento').on('submit',function(e){
	});
	function atualiza_orcamento(){
		if(ajax!=null)
			ajax.abort();
		$.ajax({
			url:location.href,
			dataType:'text',
			type:'POST',
			data:$('#formulario_orcamento').serialize()+'&ajax=1',
			success:function(data){
				
			}
		});
	}
	if($('.swiper-wrapper .modal').length>0){
		$('.swiper-wrapper .modal').each(function(){
			$(this).insertBefore($(this).parent().parent());
		});
	}
	//FORMULÁRIO DE CAPTAÇÃO DE LEAD
	$('.abreLead').on('click',function(e){
		e.preventDefault();
		e.stopPropagation();
		let canal=this.getAttribute('data-canal')==undefined?'':this.getAttribute('data-canal');
		abreLead(this.getAttribute('href'),canal);
	});
	$('a').on('click',function(e){
		let link=this.getAttribute('href');
		if(link.indexOf('api.whatsapp.com')>0 || link.indexOf('/wa.me')>0){
			e.preventDefault();
			e.stopPropagation();
			abreLead(link,'WhatsApp');
		}
	});
	var modalLead=null;
	function abreLead(link,canal='N/D'){
		if($('#modalLead').length==0){
			$('body').append(
				'<div class="modal-whatsapp">'+
					'<div class="modal fade show" id="modalLead" tabindex="-1" aria-labelledby="Captação de Lead" aria-modal="true" role="dialog" style="display: block;">'+
						'<div class="modal-dialog modal-dialog-centered" role="document">'+
							'<div class="modal-content">'+
								'<div class="modal-header">'+
									'<h5 class="modal-title">'+
										'<i class="bi bi-whatsapp me-1"></i>'+
										'Contato via WhatsApp'+
									'</h5>'+
									'<button id="fechaLead" type="button" class="btn-close" data-dismiss="modal" aria-label="Close"></button>'+
								'</div>'+
								'<div class="modal-body">'+
									'<form method="post" id="form_lead" class="form-floating needs-validation" novalidate="" target="_blank">'+
										'<input type="hidden" name="lead_link" value="'+btoa(link)+'">'+
										'<input type="hidden" name="lead_url" value="'+window.location.href+'">'+
										'<input type="hidden" name="lead_canal" value="'+canal+'">'+
										'<div>Para prosseguir, preencha o formulário abaixo:</div>'+
										'<div class="col-12 form-floating mt-3">'+
											'<input type="text" name="lead_nome" class="form-control" id="lead_nome" placeholder="Seu nome completo" value="" required="">'+
											'<label for="lead_nome">Seu nome completo</label>'+
										'</div>'+
										'<div class="col-12 form-floating mt-3">'+
											'<input type="email" name="lead_email" class="form-control" id="lead_email" placeholder="Seu melhor e-mail" value="" required="">'+
											'<label for="lead_email">Seu melhor e-mail</label>'+
										'</div>'+
										'<div class="col-12 form-floating mt-3">'+
											'<input type="tel" name="lead_telefone" class="form-control telefone" id="lead_telefone" placeholder="Seu telefone" value="" required="">'+
											'<label for="lead_telefone">Seu telefone</label>'+
										'</div>'+
										'<div class="col-12 form-floating">'+
											'<button class="btn btn-primary w-100 mt-3" type="submit">'+
												'<i class="bi bi-whatsapp me-1"></i>'+
												'Iniciar Conversa'+
											'</button>'+
										'</div>'+
										'<div class="modal__whatsapp__assinatura">Criado com <a href="https://www.eleve.me" target="_blank" title="Projeto Eleve.me">Projeto Eleve.me</a></div>'+
									'</form>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>'+
				'</div>'
			);
			$('#fechaLead').on('click',function(e){modalLead.toggle();});
			$('#form_lead').on('submit',trataSubmit);
			$('#form_lead').on('submit',function(e){
				if($(this).find(':invalid').length>0){
					e.preventDefault();
				}else{
					$('#form_lead button[type=submit]').removeAttr('disabled');
					modalLead.toggle();
				}
			});
			$('#lead_telefone').mask("(99) 99999-999?9").focusout(function(event){
				var target, phone, element;
				target = (event.currentTarget) ? event.currentTarget : event.srcElement;
				phone = target.value.replace(/\D/g, '');
				element = $(target);
				element.unmask();
				if(phone.length > 10 || phone.length==0){
					element.mask("(99) 99999-999?9");
				}else{
					element.mask("(99) 9999-9999?9");
				}
				element.change();
			});
			modalLead=new bootstrap.Modal($('#modalLead')[0],{keyboard:false});
			modalLead.show();
		}
		$('#lead_nome').val('');
		$('#lead_telefone').val('');
		$('#lead_email').val('');
		if(modalLead!=null){
			modalLead.show();
		}
	}
});
