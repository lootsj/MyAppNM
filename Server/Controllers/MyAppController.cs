using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Cors;
using Newtonsoft.Json;
using Asp2017.Server.Models;




namespace Asp2017.Server.Controllers
{
  [Route("api/[controller]")]
  [EnableCors("CorsPolicy")]
  public class MyAppController : Controller
    {

    public static T GetApiResponse<T>(string url)
    {
      using (var client = new HttpClient())
      {
        Uri uriResult;

        bool result = Uri.TryCreate(url, UriKind.Absolute, out uriResult)
            && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);

        var response = client.GetStringAsync(uriResult);
        return JsonConvert.DeserializeObject<T>(response.Result);
      }
    }

    [HttpGet("GetStockSymbolFromAPI")]
    public IActionResult GetStockSymbolFromAPI()
    {
      var response = GetApiResponse<List<StockSymbol>>("https://api.iextrading.com/1.0/ref-data/symbols");
      return Json(response);
    }

    [HttpGet("GetStockLogoAPI")]
    public IActionResult GetStockLogoAPI(string symbol)
    {
      var response = GetApiResponse<Logo>($"https://api.iextrading.com/1.0/stock/{symbol}/logo");
      return Json(response);
    }


    [HttpGet("GetStockPriceAPI")]
    public IActionResult GetStockPriceAPI(string symbol)
    {
      var response = GetApiResponse<string>("https://api.iextrading.com/1.0/stock/{symbol}/price");
      return Json(response);
    }



    [HttpGet("GetStockCompanyAPI")]
    public IActionResult GetStockCompanyAPI(string symbol)
    {
      var response = GetApiResponse<Company>("https://api.iextrading.com/1.0/stock/{symbol}/company");
      return Json(response);
    }

  }
}
