//testing the login function of Hollaex Kit
//Using Selenium webderiver and Mocha/Chai
//given, when and then

const scrap = require('./scraper');
const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const { expect } = require('chai');
const { Console } = require('console');
var randomstring = require('randomstring');
const dotenv = require('dotenv');
dotenv.config();
let User = process.env.NEW_USER;
let passWord = process.env.PASSWORD;
let signUpPage = process.env.SIGN_UP_PAGE;
let emailAdmin =process.env.Email_ADMIN_USERNAME;
const newUser = randomstring.generate(4)+'@'+User ;
console.log(newUser);

describe('NewUserRequest', function() {
	this.timeout(100000);
	let driver;
	let vars;
	function sleep(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
	beforeEach(async function() {
		driver = await new Builder().forBrowser('chrome').build();
		vars = {};
	});
	afterEach(async function() {
		//await driver.quit();
   
	});

	it('NewUserRequest', async function() {
		console.log('Test name: NewUserRequest');
		console.log(' Step # | name | target | value');
		console.log('1 | open | ',signUpPage);
		await driver.get(signUpPage);
		const title = await driver.getTitle();
		console.log(title);
		expect(title).to.equal(title);
		console.log('entring sand box');
		console.log(' Step # | action | target | value');
		console.log('2 | setWindowSize | 1050x660 | ');
		await driver.manage().window().setRect(1050, 660);
     
		console.log('3 | type | name=email |',newUser);
		await driver.wait(until.elementLocated(By.name('email')), 5000);
		await driver.findElement(By.name('email')).clear();
		await driver.findElement(By.name('email')).sendKeys(newUser);
     
		console.log('4 | type | name=password | password!');
		await driver.findElement(By.name('password')).clear();
		await driver.findElement(By.name('password')).sendKeys(passWord);
      
      
		console.log('5 | type | name=password_repeat | your password again!');
		await driver.findElement(By.name('password_repeat')).clear();
		await driver.findElement(By.name('password_repeat')).sendKeys(passWord);
		await sleep(2000);
		console.log('6 | click | name=terms |'); 
		await driver.findElement(By.name('terms')).click();
		await sleep(10000);
		console.log('7 | click | css=.holla-button |'); 
		await driver.wait(until.elementIsEnabled(await driver.findElement(By.css('.holla-button'))), 50000);
		await driver.findElement(By.css('.holla-button')).click();
		await driver.executeScript('window.scrollTo(0,0)');

  
	});
	it('Email Confirmation', async function() {
		console.log('Test name: Confirmation');
		console.log('Step # | name | target | value');
		console.log('1 | open | /auth/?client_id=4534a10755c6fd46&redirect_uri=https%3A%2F%2Fwebmail.mail.us-west-2.awsapps.com%2Fworkmail%2F | ');
		await driver.get('https://sahlabadi-website.awsapps.com/auth/?client_id=4534a10755c6fd46&redirect_uri=https%3A%2F%2Fwebmail.mail.us-west-2.awsapps.com%2Fworkmail%2F');
		console.log('2 | setWindowSize | 1280x680 |'); 
		await driver.manage().window().setRect(1280, 680);
		console.log('3 | click | id=wdc_username |');
		await sleep(10000);
		await driver.findElement(By.id('wdc_username')).click();
		console.log('4 | type | id=wdc_username | QA');
		await driver.findElement(By.id('wdc_username')).sendKeys(emailAdmin);
		console.log('5 | click | id=wdc_password | ');
		await driver.findElement(By.id('wdc_password')).click();
		console.log('6 | type | id=wdc_password | Password!');
		await driver.findElement(By.id('wdc_password')).sendKeys(passWord);
		console.log('7 | click | id=wdc_login_button | ');
		await driver.findElement(By.id('wdc_login_button')).click();
		console.log('8 | click | css=.x-grid3-row:nth-child(1) .subject:nth-child(1) > .grid_compact:nth-child(1) | ');
		await driver.manage().window().maximize();
		await sleep(10000);
		await driver.findElement(By.css('.x-grid3-row:nth-child(1) .subject:nth-child(1) > .grid_compact:nth-child(1)')).click();
		console.log('9 | doubleClick | css=.x-grid3-row:nth-child(1) .subject:nth-child(1) > .grid_compact:nth-child(1) | ');
		{
			const element = await driver.findElement(By.css('.x-grid3-row:nth-child(1) .subject:nth-child(1) > .grid_compact:nth-child(1)'));
			await driver.actions({ bridge: true}).doubleClick(element).perform();
		}
		console.log('10 | selectFrame | index=1 | ');
		await driver.switchTo().frame(1);
		await sleep(10000);
		console.log('12 | storeText | xpath=/html/body/pre/a[22] | content');
		vars['content'] = await driver.findElement(By.xpath('/html/body/pre/a[22]')).getText();
		const emailCont = await driver.findElement(By.css('pre')).getText();
		console.log('13 | echo | ${content} | ');
		console.log(vars['content']);
		console.log('14 | assertText | xpath=/html/body/pre/a[22] | ${content}');
		//	expect(vars['content']).to.equal(newUser.toLowerCase());
     
		console.log('15 | storeAttribute | xpath=/html/body/pre/a[26]@href | mytextlink');
		{
			const attribute = await driver.findElement(By.xpath('/html/body/pre/a[26]')).getAttribute('href');
			vars['mytextlink'] = attribute;
		}
		console.log('16 | echo | ${mytextlink} | ');
		console.log(vars['mytextlink']);
		console.log('17 | echo | \'xpath=/html/body/pre/a[26]\' | ');
		console.log('\'xpath=/html/body/pre/a[26]\'');
		console.log('18 | open | ${mytextlink} | ');
		
		const completedLink = await scrap.addRest(emailCont,vars['mytextlink']);
		await console.log(completedLink);
		await driver.get(completedLink);
		console.log('19 | selectFrame | relative=parent | ');
		await sleep(1000);
		await driver.switchTo().defaultContent();
		console.log('20 | click | css=.icon_title-wrapper | ');
		await driver.findElement(By.css('.icon_title-wrapper')).click();
		console.log('21 | assertNotText | css=.icon_title-text | Error');
		{
			const text = await driver.findElement(By.css('.icon_title-text')).getText();
			assert(text !== 'Error');
		}
	});
});