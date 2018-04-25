using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asp2017.Server.Models
{
  public class StockSymbol
  {
    public string Symbol { get; set; }
    public string Name { get; set; }
    public string Date { get; set; }
    public string IsEnabled { get; set; }
    public string Type { get; set; }
    public string IexID { get; set; }

    public StockSymbol()
    {

    }
  }
}
