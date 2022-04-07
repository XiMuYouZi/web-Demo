'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">test-nestjs documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' : 'data-target="#xs-controllers-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' :
                                            'id="xs-controllers-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' : 'data-target="#xs-injectables-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' :
                                        'id="xs-injectables-links-module-AppModule-7fc2c8a682e1fe5736a498a4d4ab21295e431d074f4f7333c14b484edfb328ffa984f8719eff8acfb36fa85e21eeeb0a44b9d3664af6db6eb1cab35af69ed3d8"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/ArticleModule.html" data-type="entity-link" >ArticleModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' : 'data-target="#xs-controllers-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' :
                                            'id="xs-controllers-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' }>
                                            <li class="link">
                                                <a href="controllers/ArticleController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' : 'data-target="#xs-injectables-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' :
                                        'id="xs-injectables-links-module-ArticleModule-0f10271cb0b5e0fa5665bc56aa42fe32d75717c1d7f345bd65e48d72f9189e2aa82ad3682de7b4bcacfeef3c2218aeac9aadcd4cc1b97305169d80e9733cbedc"' }>
                                        <li class="link">
                                            <a href="injectables/ArticleService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArticleService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AuthModule-63f7215ba0671440399dda85b0298bddb27713475c8cfdde72a69146469a7d68c4308b90c281b00fac611a69719a8e3956006e336d80d0d6c698132258882b2a"' : 'data-target="#xs-injectables-links-module-AuthModule-63f7215ba0671440399dda85b0298bddb27713475c8cfdde72a69146469a7d68c4308b90c281b00fac611a69719a8e3956006e336d80d0d6c698132258882b2a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-63f7215ba0671440399dda85b0298bddb27713475c8cfdde72a69146469a7d68c4308b90c281b00fac611a69719a8e3956006e336d80d0d6c698132258882b2a"' :
                                        'id="xs-injectables-links-module-AuthModule-63f7215ba0671440399dda85b0298bddb27713475c8cfdde72a69146469a7d68c4308b90c281b00fac611a69719a8e3956006e336d80d0d6c698132258882b2a"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/JwtStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >JwtStrategy</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/LocalStrategy.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LocalStrategy</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CaslModule.html" data-type="entity-link" >CaslModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CaslModule-3f35af8fbda98a03e1cd34b6b7f86e12a288b730605bbf7e820d319d2af31e2ffd2e7637788f702019029330695bb08175be9afa0085b8258e8d4e44c61b7971"' : 'data-target="#xs-injectables-links-module-CaslModule-3f35af8fbda98a03e1cd34b6b7f86e12a288b730605bbf7e820d319d2af31e2ffd2e7637788f702019029330695bb08175be9afa0085b8258e8d4e44c61b7971"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CaslModule-3f35af8fbda98a03e1cd34b6b7f86e12a288b730605bbf7e820d319d2af31e2ffd2e7637788f702019029330695bb08175be9afa0085b8258e8d4e44c61b7971"' :
                                        'id="xs-injectables-links-module-CaslModule-3f35af8fbda98a03e1cd34b6b7f86e12a288b730605bbf7e820d319d2af31e2ffd2e7637788f702019029330695bb08175be9afa0085b8258e8d4e44c61b7971"' }>
                                        <li class="link">
                                            <a href="injectables/CaslAbilityFactory.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CaslAbilityFactory</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/CatsModule.html" data-type="entity-link" >CatsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' : 'data-target="#xs-controllers-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' :
                                            'id="xs-controllers-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' }>
                                            <li class="link">
                                                <a href="controllers/CatsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' : 'data-target="#xs-injectables-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' :
                                        'id="xs-injectables-links-module-CatsModule-1e7b7ec17368d30b455d6e475387171494895c53bfa4b63f22c7e7adc87a4e703aca8d6b5880e32bef54742b88378b369651e830f0d1b9991fa256442f49880a"' }>
                                        <li class="link">
                                            <a href="injectables/CatsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CatsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-UsersModule-0959b4245ac69f3c3a59f599d37966ac0f2d4f5147335bb76926ca3a44aba35302f03d3a667c179d77d689571c280593dcf461e7f9cb279e1dd30f7224cab848-1"' : 'data-target="#xs-injectables-links-module-UsersModule-0959b4245ac69f3c3a59f599d37966ac0f2d4f5147335bb76926ca3a44aba35302f03d3a667c179d77d689571c280593dcf461e7f9cb279e1dd30f7224cab848-1"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-0959b4245ac69f3c3a59f599d37966ac0f2d4f5147335bb76926ca3a44aba35302f03d3a667c179d77d689571c280593dcf461e7f9cb279e1dd30f7224cab848-1"' :
                                        'id="xs-injectables-links-module-UsersModule-0959b4245ac69f3c3a59f599d37966ac0f2d4f5147335bb76926ca3a44aba35302f03d3a667c179d77d689571c280593dcf461e7f9cb279e1dd30f7224cab848-1"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/MessageEntity.html" data-type="entity-link" >MessageEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Article.html" data-type="entity-link" >Article</a>
                            </li>
                            <li class="link">
                                <a href="classes/Article-1.html" data-type="entity-link" >Article</a>
                            </li>
                            <li class="link">
                                <a href="classes/CaslController.html" data-type="entity-link" >CaslController</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateArticleDto.html" data-type="entity-link" >CreateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateCatDto.html" data-type="entity-link" >CreateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/ForbiddenExceptionCustom.html" data-type="entity-link" >ForbiddenExceptionCustom</a>
                            </li>
                            <li class="link">
                                <a href="classes/HttpExceptionFilter.html" data-type="entity-link" >HttpExceptionFilter</a>
                            </li>
                            <li class="link">
                                <a href="classes/ListAllEntities.html" data-type="entity-link" >ListAllEntities</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateArticleDto.html" data-type="entity-link" >UpdateArticleDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateCatDto.html" data-type="entity-link" >UpdateCatDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="classes/UserController.html" data-type="entity-link" >UserController</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/CacheInterceptor.html" data-type="entity-link" >CacheInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ClassValidationPipe.html" data-type="entity-link" >ClassValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ErrorsInterceptor.html" data-type="entity-link" >ErrorsInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ExcludeNullInterceptor.html" data-type="entity-link" >ExcludeNullInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/JoiValidationPipe.html" data-type="entity-link" >JoiValidationPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LoggingInterceptor.html" data-type="entity-link" >LoggingInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ParseIntPipe.html" data-type="entity-link" >ParseIntPipe</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TimeoutInterceptor.html" data-type="entity-link" >TimeoutInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TransformInterceptor.html" data-type="entity-link" >TransformInterceptor</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ValidationPipe.html" data-type="entity-link" >ValidationPipe</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#guards-links"' :
                            'data-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/PoliciesGuard.html" data-type="entity-link" >PoliciesGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Cat.html" data-type="entity-link" >Cat</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IPolicyHandler.html" data-type="entity-link" >IPolicyHandler</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});