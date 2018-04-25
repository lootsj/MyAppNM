using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Asp2017.Server.Models
{
    public class Company
    {
    public string Symbol { get; set; }
    public string CompanyName { get; set; }
    public string Exchange { get; set; }
   // public string LatestPrice { get; set; }
    public string Industry { get; set; }
    public string WebSite { get; set; }
    public string Description { get; set; }
    public string CEO { get; set; }
    public string IssueType { get; set; }
    public string Sector { get; set; }

    public Company()
    {

    }
  }
}
